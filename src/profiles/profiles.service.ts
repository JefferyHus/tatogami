import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  create(createProfileInput: CreateProfileInput, user: User): Promise<Profile> {
    return this.profileRepository
      .create({
        ...createProfileInput,
        user: {
          id: user.id,
        },
      })
      .save();
  }

  findOne(user: User): Promise<Profile> {
    return this.profileRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  update(
    updateProfileInput: UpdateProfileInput,
    user: User,
  ): Promise<UpdateResult> {
    return this.profileRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateProfileInput,
      })
      .where({
        user: {
          id: user.id,
        },
      })
      .returning('*')
      .execute();
  }
}
