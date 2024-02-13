import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUser } from 'src/login_user/entities/login_user.entity';
import { LoginUserService } from 'src/login_user/login_user.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { jwt_constant } from './jwt_constant';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(LoginUser) private loginUserRepo: Repository<LoginUser>,
    private loginUserService: LoginUserService,
    private JwtService: JwtService

  ) { }

  async verifyLogin(email: string, password: string) {
    let findUserByEamil = await this.loginUserService.findEmail(email);
    if (!findUserByEamil) {
      throw new HttpException({ message: "User not found with this email" }, 400)
    }
    let isVerified = await bcrypt.compare(password, findUserByEamil.password)
    if (!isVerified) {
      throw new HttpException({ message: "Invalid login details" }, 400)
    }
    return findUserByEamil
  }

  async signIn(authDto: CreateAuthDto,) {
    let { email, password } = authDto;
    let userDeatials = await this.verifyLogin(email, password);
    let payload = {
      sub: userDeatials.userId,
      email: userDeatials.email
    };
    let jwttoken = this.JwtService.sign(payload);
    this.loginUserService.updateToken(userDeatials.userId, jwttoken);
    return {
      statusCode: 200,
      message: "Login In successfully",
      token: jwttoken,
      userId: userDeatials.userId,
      userEmail: userDeatials.email,
      expiresIn: jwt_constant.EXPIRATION_TIME,
    }
  }
  validateToken(token: string) {
    return this.JwtService.verify(token, {
      secret: jwt_constant.secret_key
    });
  }
}
