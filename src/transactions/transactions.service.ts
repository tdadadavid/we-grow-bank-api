import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import TransactionDAO, { Transactions } from "./entities/transactions.entity";
import { InjectModel } from "nestjs-typegoose";


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions)
    private readonly transactionRepo: ReturnModelType<typeof TransactionDAO>,
  ) {}
}
