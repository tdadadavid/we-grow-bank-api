import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => GraphQLString)
  id: string;

  @Field(() => GraphQLString)
  firstname: string;

  @Field(() => GraphQLString)
  lastname: string;

  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  password: string;

  @Field(() => GraphQLString)
  phoneNumber: string;
}
