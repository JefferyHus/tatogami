import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccessKeysService } from './access-keys.service';
import { AccessKey } from './entities/access-key.entity';
import { CreateAccessKeyInput } from './dto/create-access-key.input';
import { UpdateAccessKeyInput } from './dto/update-access-key.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => AccessKey)
export class AccessKeysResolver {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AccessKey)
  createAccessKey(
    @Args('createAccessKeyInput') data: CreateAccessKeyInput,
    @CurrentUser() user: User,
  ) {
    return this.accessKeysService.create(data, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [AccessKey], { name: 'accessKeys' })
  findAll(@CurrentUser() user: User) {
    return this.accessKeysService.findAll(user);
  }

  @Query(() => AccessKey, { name: 'accessKey' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.accessKeysService.findOne(id, user);
  }

  @Mutation(() => AccessKey)
  updateAccessKey(
    @Args('updateAccessKeyInput') data: UpdateAccessKeyInput,
    @CurrentUser() user: User,
  ) {
    return this.accessKeysService.update(data.id, data, user);
  }

  @Mutation(() => AccessKey)
  removeAccessKey(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.accessKeysService.remove(id, user);
  }
}
