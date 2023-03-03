import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import { DocumentType } from "@typegoose/typegoose";
import mongoose from "mongoose";
import * as process from "process";

@ObjectType()
export class User {
  @Field(() => GraphQLString, { description: "Unique Identifier" })
  readonly _id: string;

  @Field(() => GraphQLString, { description: "Unique Identifier" })
  @Prop({ required: true, type: String })
  firstname: string;

  @Field(() => GraphQLString, { description: "User lastname" })
  @Prop({ required: true, type: String })
  lastname: string;

  @Field(() => GraphQLString, { description: "Unique Identifier" })
  @Prop({ required: true, type: String })
  email: string;

  @Field(() => GraphQLString)
  @Prop({ required: true, type: String })
  password: string;

  @Field(() => GraphQLString)
  @Prop({ required: true, type: String })
  accountNumber: string;

  @Field(() => GraphQLString)
  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: Date;

  @Field(() => GraphQLString)
  @Prop({ required: true, type: Date, default: Date.now() })
  updatedAt: Date;

  @Field(() => GraphQLString)
  @Prop({ required: true, type: String })
  phoneNumber: string;

  static builder() {
    return new User();
  }

  setAccountNum(num: string) {
    this.accountNumber = num;
    return this;
  }

  setPhoneNumber(num: string){
    this.phoneNumber = num;
    return this;
  }

  public setFirstname(name: string) {
    this.firstname = name;
    return this;
  }
  public setLastName(name: string) {
    this.lastname = name;
    return this;
  }

  public setEmail(address: string): this {
    this.email = address;
    return this;
  }

  public setPassword(value: string): this {
    this.password = value;
    return this;
  }

  public build(): User {
    return this;
  }
}

const UserDAO = getModelForClass<typeof User>(User);

export default UserDAO;
