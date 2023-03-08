import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { Deposit } from "../entities/deposit.entity";
import { GraphQLString } from "graphql/type";

@ObjectType()
export class DepositResponse {
  @Field(() => GraphQLString)
  readonly _id: string;

  @Field(() => GraphQLString)
  balance: string;

  @Field(() => GraphQLString)
  createdAt: string;
}

@ObjectType()
export class DepositResponseDto {
  @Field(() => GraphQLString, { description: "Response message" })
  message: string;

  @Field(() => DepositResponse, { description: "The transaction" })
  data: Record<any, any>;
}
