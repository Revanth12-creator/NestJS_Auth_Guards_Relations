import { Test, TestingModule } from '@nestjs/testing';
import { QuationsService } from './quations.service';

describe('QuationsService', () => {
  let service: QuationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuationsService],
    }).compile();

    service = module.get<QuationsService>(QuationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
