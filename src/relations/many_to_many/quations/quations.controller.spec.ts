import { Test, TestingModule } from '@nestjs/testing';
import { QuationsController } from './quations.controller';
import { QuationsService } from './quations.service';

describe('QuationsController', () => {
  let controller: QuationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuationsController],
      providers: [QuationsService],
    }).compile();

    controller = module.get<QuationsController>(QuationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
