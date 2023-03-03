import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { SchemaTypes } from "mongoose";

export enum TRANSACTION_TYPES {
  DEPOSIT,
  WITHDRAWAL,
}

@ObjectType()
export class Transactions {
  @Field(() => GraphQLString, { description: "Unique Identifier" })
  readonly _id: string;

  @Field(() => GraphQLString, { description: "Transaction type or category " })
  @Prop({ required: true, type: Number, enum: TRANSACTION_TYPES })
  type: TRANSACTION_TYPES;

  tranAmount: string;

  @Field(() => GraphQLString, {
    description: "Destination account identifier",
  })
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  destinationAccount: string;

  @Field(() => GraphQLString, {
    description: "Destination account identifier",
  })
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  sourceAccount: string;

  @Field(() => GraphQLString, {
    description: "States if the account are of different currencies",
  })
  @Prop({ required: true, type: Boolean, default: false })
  isDiffCurrency: boolean;

  @Field(() => GraphQLString, {
    description: "Exchange rate used (if it was used)",
  })
  @Prop({ required: false, type: String })
  exchangeRatesUsed: string;

  @Field(() => GraphQLISODateTime, {
    description: "Time transaction took place",
  })
  @Prop({ required: true, default: Date.now(), type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description:
      "Current balance of account involved[if two accounts are involved then the receiver's account is only captured",
  })
  @Prop({ required: true, type: Number })
  prevBalance: number;

  @Field(() => GraphQLISODateTime, {
    description:
      "Current balance of account involved[if two accounts are involved then the receiver's account is only captured",
  })
  @Prop({ required: true, type: Number })
  currentBalance: number;

  static builder() {
    return new Transactions();
  }

  transactionType(type: TRANSACTION_TYPES): Transactions {
    this.type = type;
    return this;
  }

  setDestinationAccount(account: string): Transactions {
    this.destinationAccount = account;
    return this;
  }

  setSourceAccount(account: string): Transactions {
    this.sourceAccount = account;
    return this;
  }

  setCurrencyDiffStatus(status: boolean): Transactions {
    this.isDiffCurrency = status;
    return this;
  }

  setExchangeRatesUsed(rates: string): Transactions {
    this.exchangeRatesUsed = rates;
    return this;
  }

  setAmountInvolved(amount: string) {
    this.tranAmount = amount;
    return this;
  }

  setPrevBalance(balance: number) {
    this.prevBalance = balance;
    return this;
  }

  setCurrentBalance(balance: number): Transactions {
    this.currentBalance = balance;
    return this;
  }
}

const TransactionDAO = getModelForClass<typeof Transactions>(Transactions);
export default TransactionDAO;
