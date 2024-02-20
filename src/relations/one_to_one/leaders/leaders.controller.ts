import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { LeadersService } from './leaders.service';

@Controller('leaders')
export class LeadersController {
  constructor(private readonly leadersService: LeadersService) { }

  @Post('create')
  create(@Body() createLeaderDto: CreateLeaderDto) {
    return this.leadersService.create(createLeaderDto);
  }

  @Get()
  findAll() {
    return this.leadersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leadersService.findOne(+id);
  }
}
