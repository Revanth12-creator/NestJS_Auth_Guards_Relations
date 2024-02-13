import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateLoginUserDto } from './dto/create-login_user.dto';
import { UpdateLoginUserDto } from './dto/update-login_user.dto';
import { LoginUserService } from './login_user.service';


@Controller('user')
export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService,
    private readonly authService: AuthService) { }

  @Post('sign-up')
  create(@Body() createLoginUserDto: CreateLoginUserDto) {
    console.log(createLoginUserDto);
    return this.loginUserService.singUp(createLoginUserDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto);
  }

  @Get()
  findAll() {
    return this.loginUserService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.loginUserService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLoginUserDto: UpdateLoginUserDto) {
    return this.loginUserService.update(id, updateLoginUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.loginUserService.remove(id);
  }

}
