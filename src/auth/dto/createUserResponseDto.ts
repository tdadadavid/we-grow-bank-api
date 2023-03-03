import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { CreateUserDto } from "./create-auth.input";
import { GraphQLString } from "graphql/type";
import { Account } from "../../accounts/entities/account.entity";
import { User } from "../../users/entities/user.entity";
import { UserResponseDto } from "./LoginResponseDto";

@ObjectType()
class AccountResponse extends PartialType<Account>(Account){}

@ObjectType()
class UserAuthCreationDto {
  @Field(() => UserResponseDto, {
    description: "Response object for user auth ",
  })
  user: Record<any, any>;

  @Field(() => AccountResponse, {
    description: "Account for newly created user",
  })
  account: Record<any, any>;
}

@ObjectType()
export class CreateUserResponseDto {
  @Field(() => GraphQLString, { description: "Any message" })
  message: string;

  @Field(() => UserAuthCreationDto, { description: "Response Information"})
  data: Record<any, any>;
}
