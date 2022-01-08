import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindProjectInput {
  @Field(() => Int)
  userId: number;
}
