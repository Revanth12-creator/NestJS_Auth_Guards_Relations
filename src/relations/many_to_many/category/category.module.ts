import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quation } from '../quations/entities/quation.entity';
import { QuationsService } from '../quations/quations.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Quation])],
  controllers: [CategoryController],
  providers: [CategoryService, QuationsService]
})
export class CategoryModule { }
