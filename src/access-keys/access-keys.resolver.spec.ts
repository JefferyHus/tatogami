import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeysResolver } from './access-keys.resolver';
import { AccessKeysService } from './access-keys.service';

describe('AccessKeysResolver', () => {
  let resolver: AccessKeysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessKeysResolver, AccessKeysService],
    }).compile();

    resolver = module.get<AccessKeysResolver>(AccessKeysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
