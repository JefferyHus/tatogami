import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac, Hash } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccessKeyInput } from './dto/create-access-key.input';
import { UpdateAccessKeyInput } from './dto/update-access-key.input';
import { AccessKey } from './entities/access-key.entity';

@Injectable()
export class AccessKeysService {
  constructor(
    @InjectRepository(AccessKey)
    private readonly accessKeyRepository: Repository<AccessKey>,
  ) {}

  create(data: CreateAccessKeyInput, user: User): Promise<AccessKey> {
    return this.accessKeyRepository
      .create({
        name: data.name,
        public_key: `pb_${createHmac('sha256', 'public')
          .update(`${data.name}:${user.id}`)
          .digest('hex')}`,
        private_key: `pr_${createHmac('sha256', 'private')
          .update(`${data.name}:${user.id}`)
          .digest('hex')}`,
        user: {
          id: user.id,
        },
      })
      .save();
  }

  findAll(user: User): Promise<AccessKey[]> {
    return this.accessKeyRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  findOne(id: number, user: User): Promise<AccessKey> {
    return this.accessKeyRepository.findOne(id, {
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  update(
    id: number,
    data: UpdateAccessKeyInput,
    user: User,
  ): Promise<AccessKey> {
    return this.accessKeyRepository.save({
      id,
      name: data.name,
      public_key: `pb_${createHmac('sha256', 'public')
        .update(`${data.name}:${user.id}`)
        .digest('hex')}`,
      private_key: `pr_${createHmac('sha256', 'private')
        .update(`${data.name}:${user.id}`)
        .digest('hex')}`,
      user: {
        id: user.id,
      },
    });
  }

  async remove(id: number, user: User): Promise<AccessKey> {
    const accessKey = await this.accessKeyRepository.findOne(id, {
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return accessKey.remove();
  }
}
