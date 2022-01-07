import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.profilesService.create(createProfileInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Profile, { name: 'profile' })
  findOne(@CurrentUser() user: User): Promise<Profile> {
    return this.profilesService.findOne(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.profilesService
      .update(updateProfileInput, user)
      .then((result) => {
        return result.raw[0];
      });
  }
}
