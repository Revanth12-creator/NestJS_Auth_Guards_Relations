import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leader } from './entities/leader.entity';
import { LeadersController } from './leaders.controller';
import { LeadersService } from './leaders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leader])],
  controllers: [LeadersController],
  providers: [LeadersService]
})
export class LeadersModule { }
