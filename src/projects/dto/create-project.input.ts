import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, {
    nullable: true,
  })
  thumbnail: string;

  @Field(() => String)
  url: string;
}
