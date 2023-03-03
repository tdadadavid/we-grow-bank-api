import { CreateUserResponseDto } from "./createUserResponseDto";
import {
  Field,
  GraphQLISODateTime,
  InputType,
  ObjectType,
} from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { User } from "../../users/entities/user.entity";

@ObjectType()
class TokenResponseDto {
  @Field(() => GraphQLString, { description: "Access token " })
  accessToken: string;

  @Field(() => GraphQLString, { description: "Refresh token" })
  refreshToken: string;

  @Field(() => GraphQLString, { description: "Access token life span" })
  accessTokenExpiresAt: Date;

  @Field(() => GraphQLString, { description: "Refresh token life span " })
  refreshTokenExpiresAt: Date;
}

@ObjectType()
export class UserResponseDto {

  @Field(() => GraphQLString, { description: "User id"})
  _id: string;

  @Field(() => GraphQLString, { description: "firstname" })
  firstname: string;

  @Field(() => GraphQLString, { description: "lastname" })
  lastname: string;

  @Field(() => GraphQLString, { description: "email" })
  email: string;

  @Field(() => GraphQLString, { description: "account" })
  accountNumber: string;

  @Field(() => GraphQLString, { description: "phoneNumber" })
  phoneNumber: string;

  @Field(() => GraphQLISODateTime, { description: "User creation date" })
  createdAt: Date;
}

@ObjectType()
class ResponseDataDto {
  @Field(() => UserResponseDto, { description: "User details " })
  user: Record<any, any>;

  @Field(() => TokenResponseDto, { description: "All tokens " })
  tokens?: Record<any, any>;
}

@ObjectType()
export class LoginResponseDto {
  @Field(() => GraphQLString, { description: "Login message" })
  message: string;
  @Field(() => ResponseDataDto, { description: "Any relevant information" })
  data: Record<any, any>;
}
