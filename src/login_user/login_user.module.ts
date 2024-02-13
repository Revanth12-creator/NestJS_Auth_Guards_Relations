import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LoginUser } from './entities/login_user.entity';
import { jwt_constant } from './jwt_constant';
import { LoginUserController } from './login_user.controller';
import { LoginUserService } from './login_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginUser]),
  JwtModule.register({
    global: true,
    secret: jwt_constant.secret_key,
    signOptions: { expiresIn: jwt_constant.EXPIRATION_TIME },
  })],
  controllers: [LoginUserController],
  providers: [LoginUserService, AuthService]
})
export class LoginUserModule { }
