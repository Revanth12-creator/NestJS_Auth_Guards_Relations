import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuationDto } from './dto/create-quation.dto';
import { QuationsService } from './quations.service';

@Controller('quations')
export class QuationsController {
  constructor(private readonly quationsService: QuationsService) { }

  @Post('create')
  create(@Body() createQuationDto: CreateQuationDto) {
    return this.quationsService.create(createQuationDto);
  }

  @Get()
  findAll() {
    return this.quationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quationsService.findOne(+id);
  }


}
