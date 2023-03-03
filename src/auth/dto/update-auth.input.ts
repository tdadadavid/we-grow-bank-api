import { CreateUserDto } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateUserDto) {
  @Field(() => Int)
  id: number;
}
