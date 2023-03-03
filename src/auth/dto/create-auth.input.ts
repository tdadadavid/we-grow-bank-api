import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';

@InputType()
export class CreateUserDto {
  @Field(() => GraphQLString)
  readonly firstname: string;

  @Field(() => GraphQLString)
  readonly lastname: string;

  @Field(() => GraphQLString)
  readonly email: string;

  @Field(() => GraphQLString)
  readonly password: string;

  @Field(() => GraphQLString)
  readonly phoneNumber: string;

  @Field(() => GraphQLString)
  readonly currency: string;
}
