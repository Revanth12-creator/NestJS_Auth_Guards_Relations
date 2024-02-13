import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginUser } from './login_user/entities/login_user.entity';
import { LoginUserModule } from './login_user/login_user.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root@123',
      database: 'curd',
      entities: [User,LoginUser ],
      logging: true,
      synchronize: true,
    }),
    UserModule,
    LoginUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
