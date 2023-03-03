import { Field, InputType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";

@InputType()
export class UserLoginDto {

  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  password: string;
}
