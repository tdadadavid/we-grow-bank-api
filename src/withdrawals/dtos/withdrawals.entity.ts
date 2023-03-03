import { Field, GraphQLISODateTime } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { SchemaTypes } from "mongoose";

export class Withdrawals {
  @Field(() => GraphQLString, { description: "Withdrawal identifier" })
  @Prop({ required: true, type: String })
  id: string;

  @Field(() => GraphQLString, { description: "Amount withdrawn " })
  @Prop({ required: true, type: Number })
  amountWithdrawn: number;

  @Field(() => GraphQLString, { description: "Account to withdrawn from" })
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  accountNumber: string;

  @Field(() => GraphQLISODateTime, {
    description: "Time withdrawal transaction occurred",
  })
  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: Date;

  static builder() {
    return new Withdrawals();
  }

  setAmount(amount: number): Withdrawals {
    this.amountWithdrawn = amount;
    return this;
  }
  setWithdrawalAccount(account: string): Withdrawals {
    this.accountNumber = account;
    return this;
  }
}


const WithdrawalDAO = getModelForClass<typeof Withdrawals>(Withdrawals);

export default WithdrawalDAO;
