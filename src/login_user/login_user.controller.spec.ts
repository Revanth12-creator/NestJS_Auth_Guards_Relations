import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserController } from './login_user.controller';
import { LoginUserService } from './login_user.service';

describe('LoginUserController', () => {
  let controller: LoginUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginUserController],
      providers: [LoginUserService],
    }).compile();

    controller = module.get<LoginUserController>(LoginUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
