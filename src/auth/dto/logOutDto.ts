import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";

@InputType()
export class LogOutDto {
  @Field(() => GraphQLString, { description: "Token to revoke" })
  token: string;
}
