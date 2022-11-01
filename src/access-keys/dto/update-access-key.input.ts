import { CreateAccessKeyInput } from './create-access-key.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccessKeyInput extends PartialType(CreateAccessKeyInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
