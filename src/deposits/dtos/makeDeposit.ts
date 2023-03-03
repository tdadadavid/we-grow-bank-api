import { Field, InputType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";


@InputType()
export class MakeDepositDto {

  @Field(() => GraphQLString, { description: "Amount to be deposited" })
  readonly amount: string;

  @Field(() => GraphQLString, { description: "Source Account"})
  readonly sourceAccount: string;

  @Field(() => GraphQLString, { description: "Destination account" })
  readonly destinationAccount: string;
}
