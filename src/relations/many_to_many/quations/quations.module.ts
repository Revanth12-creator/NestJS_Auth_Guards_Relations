import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quation } from './entities/quation.entity';
import { QuationsController } from './quations.controller';
import { QuationsService } from './quations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quation])],
  controllers: [QuationsController],
  providers: [QuationsService]
})
export class QuationsModule { }
