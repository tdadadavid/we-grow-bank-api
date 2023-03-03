import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { getModelForClass, Prop } from "@typegoose/typegoose";

@ObjectType()
export class Deposit {
  @Field(() => GraphQLString, { description: "Deposit Identified " })
  readonly _id: string;

  @Field(() => GraphQLString, { description: "Amount deposited to an account" })
  @Prop({ required: true, type: String })
  amountDeposited: string;

  @Field(() => GraphQLString, { description: "Account to be credited" })
  @Prop({ required: true, type: String })
  destinationAccount: string;

  @Field(() => GraphQLString, { description: "Account to be credited" })
  @Prop({ required: true, type: String })
  sourceAccount: string;

  @Field(() => GraphQLString, { description: "Transaction time " })
  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: Date;

  static builder() {
    return new Deposit();
  }

  setDestinationAccount(account: string) {
    this.destinationAccount = account;
    return this;
  }

  setSourceAccount(account: string) {
    this.sourceAccount = account;
    return this;
  }

  setAmountDeposited(amount: string) {
    this.amountDeposited = amount;
    return this;
  }
}

const DepositDAO = getModelForClass<typeof Deposit>(Deposit);

export default DepositDAO;
