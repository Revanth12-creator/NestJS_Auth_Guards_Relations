import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Post('create')
  create(@Body() createCountryDto: CreateCountryDto) {
    console.log(createCountryDto, 'createCountryDto');

    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: number) {
    return this.countryService.findOne(id);
  }

}
