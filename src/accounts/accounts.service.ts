import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import AccountDAO, { Account } from "./entities/account.entity";
import { InjectModel } from "nestjs-typegoose";
import { AccountNotRegisteredException } from "../commons/exceptions";

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountRepo: ReturnModelType<typeof AccountDAO>,
  ) {}

  /**
   * @desc Retrieves the account tied to the given account.
   * @param {string} number
   * @returns {Account} account
   * @throws AccountNotRegisteredException
   */
  async findAccount(number: string): Promise<Account> {
    const account: Account | undefined = await this.accountRepo.findOne({
      accountNumber: number,
    });
    if (!account) throw new AccountNotRegisteredException();

    return account;
  }
}
