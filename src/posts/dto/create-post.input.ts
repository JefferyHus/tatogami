import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  original_markdown: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}
