import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import DepositDAO, { Deposit } from "./entities/deposit.entity";
import { ReturnModelType } from "@typegoose/typegoose";
import { MakeDepositDto } from "./dtos";
import { ReturnValue } from "../commons";
import AccountDAO, { Account } from "../accounts/entities/account.entity";
import {
  AccountNotRegisteredException,
  InsufficientBalanceException,
  TransactionProcessingException,
} from "../commons/exceptions";
import { ClientSession } from "mongoose";
import { WeGrowBankLogger } from "../logger/logger.service";
import TransactionDAO, {
  TRANSACTION_TYPES,
  Transactions,
} from "../transactions/entities/transactions.entity";

@Injectable()
export class DepositsService {
  private readonly logger: Logger = new Logger(WeGrowBankLogger.name);

  constructor(
    @InjectModel(Deposit)
    private readonly depositRepo: ReturnModelType<typeof DepositDAO>,
    @InjectModel(Account)
    private readonly accountRepo: ReturnModelType<typeof AccountDAO>,

    @InjectModel(Transactions)
    private readonly transactionRepo: ReturnModelType<typeof TransactionDAO>,
  ) {}

  async makeDeposit(depositDto: MakeDepositDto): Promise<ReturnValue> {
    this.logger.log(`Verifying source account ${depositDto.sourceAccount}`);
    //TODO optimize this query call
    const sourceAccount = await this.accountRepo.findOne({
      accountNumber: depositDto.sourceAccount,
    });

    if (!sourceAccount)
      throw new AccountNotRegisteredException("Account not registered");

    this.logger.log(
      `Verifying destination wallet ${depositDto.destinationAccount}`,
    );

    // check if the destination account is a registered wallet
    const destinationAccount = await this.accountRepo.findOne({
      accountNumber: depositDto.destinationAccount,
    });
    if (!destinationAccount)
      throw new AccountNotRegisteredException("Account not registered");

    this.logger.log("Checking for sufficient account balance");
    // check if the source account has enough funds
    const balanceIsInsufficient = +sourceAccount.balance < +depositDto.amount;
    if (balanceIsInsufficient) throw new InsufficientBalanceException();

    // start a mongoose transaction(sessions)
    this.logger.log("Starting database transaction");
    const session: ClientSession = await this.depositRepo.startSession();
    session.startTransaction();

    this.logger.log("Database transaction started");

    try {
      const prevBalance = destinationAccount.balance;
      // update the recipients account
      destinationAccount.balance += +depositDto.amount;
      destinationAccount.update().session(session);
      this.logger.log("Destination wallet credited");

      // deduct the amount transferred from the source wallet
      sourceAccount.balance -= +depositDto.amount;
      sourceAccount.update().session(session);
      this.logger.log("Source account debited");

      this.logger.log("Deposit about to be created");
      // create a new deposit
      const deposit = Deposit.builder()
        .setAmountDeposited(depositDto.amount)
        .setDestinationAccount(depositDto.destinationAccount)
        .setSourceAccount(depositDto.sourceAccount);
      await this.depositRepo.create(deposit);
      this.logger.log("Deposit created");

      const accountHaveSameCurrency =
        sourceAccount.currency === destinationAccount.currency;

      this.logger.log("Creating transaction for deposit");

      const transactions: Transactions = await Transactions.builder()
        .setAmountInvolved(depositDto.amount)
        .setCurrentBalance(+sourceAccount.balance)
        .setPrevBalance(+prevBalance)
        .transactionType(TRANSACTION_TYPES.DEPOSIT)
        .setSourceAccount(sourceAccount._id)
        .setDestinationAccount(destinationAccount._id)
        .setCurrencyDiffStatus(accountHaveSameCurrency);
      await this.transactionRepo.create(transactions);

      this.logger.log("Transaction saved successfully");

      await session.commitTransaction().then(() => {
        this.logger.log("Database transaction closed");
      });

      console.log(sourceAccount);
      return {
        message: "Deposit made successfully",
        data: sourceAccount,
      };
    } catch (exception: any) {
      await session.abortTransaction();
      this.logger.error(`Exception: occurred while depositing ${exception}`);
      throw new TransactionProcessingException(exception.message);
    }
  }
}
