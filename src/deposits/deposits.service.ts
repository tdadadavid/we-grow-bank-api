import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
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
import {HttpService} from "../commons/shared/http.service";
import {config} from "../config";

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
    private readonly httpService: HttpService
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

      const accountHaveSameCurrency =
          sourceAccount.currency === destinationAccount.currency;

      let creditedAmount: number = Math.abs(+depositDto.amount)

      console.log("same currency?", accountHaveSameCurrency);
      if (!accountHaveSameCurrency){

        const queryParams = [destinationAccount.currency, sourceAccount.currency, creditedAmount];
        const url = new URL(`https://api.apilayer.com/exchangerates_data/convert?to=${destinationAccount.currency}&from=${sourceAccount.currency}&amount=${creditedAmount}`);
        const exchangeRateResponse: any = await this.httpService
            .setAuth([
              { apiKey: config.api.exchange_rates_api_key }
            ])
            .get(queryParams, url)

        creditedAmount = exchangeRateResponse.data.info.rate * parseFloat(depositDto.amount);
      }

      destinationAccount.balance += creditedAmount;
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

      this.logger.log("Creating transaction for deposit");

      const transactions: Transactions = Transactions.builder()
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

      return {
        message: "Deposit made successfully",
        data: destinationAccount,
      };
    } catch (exception: any) {
      await session.abortTransaction();
      this.logger.error(`Exception: occurred while depositing ${exception}`);
      throw new TransactionProcessingException(exception.message);
    }
  }
}
