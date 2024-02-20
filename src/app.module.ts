import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginUser } from './login_user/entities/login_user.entity';
import { LoginUserModule } from './login_user/login_user.module';
import { CustomerModule } from './queries_example/customer/customer.module';
import { Customer } from './queries_example/customer/entities/customer.entity';
import { Order } from './queries_example/orders/entities/order.entity';
import { OrdersModule } from './queries_example/orders/orders.module';
import { CitiesModule } from './relations/one_to_many/cities/cities.module';
import { City } from './relations/one_to_many/cities/entities/city.entity';
import { CountryModule } from './relations/one_to_one/country/country.module';
import { Country } from './relations/one_to_one/country/entities/country.entity';
import { Leader } from './relations/one_to_one/leaders/entities/leader.entity';
import { LeadersModule } from './relations/one_to_one/leaders/leaders.module';
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
      entities: [User, LoginUser, Customer, Order, Country, Leader, City],
      logging: true,
      synchronize: true,
    }),
    UserModule,
    LoginUserModule,
    CustomerModule,
    OrdersModule,
    LeadersModule,
    CountryModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
