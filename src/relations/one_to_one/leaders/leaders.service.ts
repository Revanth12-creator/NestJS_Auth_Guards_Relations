import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { Leader } from './entities/leader.entity';

@Injectable()
export class LeadersService {
  constructor(@InjectRepository(Leader) private leaderService: Repository<Leader>) { }
  async create(createLeaderDto: CreateLeaderDto) {
    try {
      const { leader_fname, leader_lname, phone_no, country_id } = createLeaderDto;
      const leaderObj = {
        leader_fname, leader_lname, phone_no, country_id
      }
      return await this.leaderService.save(leaderObj)
    } catch (err) {
      return err
    }
  }




  async findAll() {
    return await this.leaderService.find({
      relations: {
        country: true
      }
    })
  }

  findOne(id: number) {
    return this.leaderService.findOne({ where: { id } });
  }
}
