import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  fullname: string;

  @Field(() => String, {
    nullable: true,
  })
  biography: string;

  @Field(() => String, {
    nullable: true,
  })
  phone: string;

  @Field(() => String, {
    nullable: true,
  })
  location: string;

  @Field(() => Number, {
    nullable: true,
  })
  years_of_experience: number;
}
