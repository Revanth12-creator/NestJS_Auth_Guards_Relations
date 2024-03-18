import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuationDto } from './dto/create-quation.dto';
import { Quation } from './entities/quation.entity';

@Injectable()
export class QuationsService {
  constructor(@InjectRepository(Quation) private quationsService: Repository<Quation>) { }
  async create(createQuationDto: CreateQuationDto) {
    try {
      const { qua_description, qua_title } = createQuationDto;
      const creatQuation = {
        qua_description, qua_title
      }
      const quationObj = this.quationsService.create(creatQuation);
      return await this.quationsService.save(quationObj)
    } catch (err) {
      return err
    }
  }

  findAll() {
    return this.quationsService.find({
      relations: {
        categories: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} quation`;
  }


}
