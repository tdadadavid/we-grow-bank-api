import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";

@ObjectType()
export class APIStatus {
  @Field(() => GraphQLString, { description: "The status of the api"})
  status: string;

  @Field(() => GraphQLString, { description: "The version of the api "})
  version: number;

  @Field(() => GraphQLString, { description: "Any message" })
  message: string;
}
