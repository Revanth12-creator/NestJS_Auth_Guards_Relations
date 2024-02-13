import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { CreateLoginUserDto } from './dto/create-login_user.dto';
import { UpdateLoginUserDto } from './dto/update-login_user.dto';
import { LoginUser } from './entities/login_user.entity';

@Injectable()
export class LoginUserService {
  constructor(@InjectRepository(LoginUser) private loginUserRepo: Repository<LoginUser>)
  { }
  async findEmail(email:string) {
   return await this.loginUserRepo.findOne({ where: { email: email } });
  }
  response = {
    statusCode: 200,
    data: {},
    message:"Updated Successfully"
  };
  async hashPassword(password:string) {
    let salt = await bcrypt.genSalt(10);
    let pwd:string=await bcrypt.hash(password,salt)
    return pwd;
  }
  async singUp(createLoginUserDto: CreateLoginUserDto) {
    let { email, password, first_name, last_name } = createLoginUserDto;
    let isUserAvailable = this.findEmail(email);
    if (!isUserAvailable) {
        throw new HttpException({message:"User already exists" },400)
    }
    let createUserObj = {
      email: email,
      password: await this.hashPassword(password),
      first_name: first_name,
      last_name: last_name
    };
   let user= await this.loginUserRepo.save(createUserObj);
      if (!user) {
         throw new HttpException({ message: 'Something' }, 400);
      }
    return {
    statusCode: 200,
    data: {},
    message:"Created Successfully"
  };
  }

 async findAll() {
   return await this.loginUserRepo.find();
  }

  findOne(userId: string) {
    return this.loginUserRepo.findOne({where:{userId:userId}})
  }

  async update(userId: string, updateLoginUserDto: UpdateLoginUserDto) {
    let { email, password, first_name, last_name } = updateLoginUserDto;
  let updateUserObj = {
      email: email,
      password: await this.hashPassword(password),
      first_name: first_name,
      last_name: last_name
  };
   let result = await this.loginUserRepo.update(userId, updateUserObj);
   if (result.affected == 1) {
    return this.response;
   } else {
     this.response.statusCode = 400;
     this.response.message = 'Someting went wrong';
    return this.response;
   }
  }
  
  async updateToken(userId: string, token: string) {
    return  await this.loginUserRepo.update(userId, {
      token
    });
}

 async  remove(userId: string) {
     let deleteUser=await this.loginUserRepo.delete(userId)
      if (deleteUser.affected == 1) {
    return this.response;
   } else {
     this.response.statusCode = 400;
     this.response.message = 'Someting went wrong';
    return this.response;
   }
 }
  
}
