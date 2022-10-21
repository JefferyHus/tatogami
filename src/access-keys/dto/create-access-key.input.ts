import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccessKeyInput {
  @Field(() => String, { description: 'The name of your application' })
  name: string;
}
