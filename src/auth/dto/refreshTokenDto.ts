import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";


@InputType()
export class RefreshTokenDto {

  @Field(() => GraphQLString, { description: "Refresh token from the client "})
  token: string;
}
