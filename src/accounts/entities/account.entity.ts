import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { getModelForClass, Prop, Ref } from "@typegoose/typegoose";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class Account {
  @Field(() => GraphQLString, { description: "Account id"})
  readonly _id: string;

  @Field(() => GraphQLString, { description: "Account number" })
  @Prop({ required: true, type: String })
  accountNumber: string;

  @Field(() => GraphQLString, { description: "Account balance" })
  @Prop({ required: true, type: Number, default: 0.0 })
  balance: number;

  @Field(() => GraphQLString, { description: "Account Holder" })
  @Prop({ required: true, type: () => String, ref: () => User })
  owner: Ref<User>;

  @Field(() => GraphQLString, { description: "Account currency" })
  @Prop({ required: true, type: String })
  currency: string;

  @Field(() => GraphQLISODateTime, { description: "Time account was created" })
  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: Date;

  static builder() {
    return new Account();
  }

  setCurrency(currency: string): Account {
    this.currency = currency;
    return this;
  }

  setAmount(amount: number): Account {
    this.balance = amount;
    return this;
  }

  setAccountNumber(accountNum: string) {
    this.accountNumber = accountNum;
    return this;
  }

  setOwner(userId: string) {
    this.owner = userId;
    return this;
  }
}

const AccountDAO = getModelForClass<typeof Account>(Account);
export default AccountDAO;
