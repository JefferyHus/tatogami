import { Module } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { AccessKeysResolver } from './access-keys.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey])],
  providers: [AccessKeysResolver, AccessKeysService],
})
export class AccessKeysModule {}
