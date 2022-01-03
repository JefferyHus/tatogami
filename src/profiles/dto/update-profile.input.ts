import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => String, {
    nullable: true,
  })
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
