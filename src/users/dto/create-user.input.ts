import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';

@InputType()
export class CreateUserInput {
  @Field(() => GraphQLString)
  readonly firstname: string;

  @Field(() => GraphQLString)
  readonly lastname: string;

  @Field(() => GraphQLString)
  readonly email: string;

  @Field(() => GraphQLString)
  readonly phoneNumber: string;
}
