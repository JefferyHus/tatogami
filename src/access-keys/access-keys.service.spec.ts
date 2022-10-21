import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeysService } from './access-keys.service';

describe('AccessKeysService', () => {
  let service: AccessKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessKeysService],
    }).compile();

    service = module.get<AccessKeysService>(AccessKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
