import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private countryService: Repository<Country>) { }
  async create(createCountryDto: CreateCountryDto) {
    try {
      const { country_name, country_code } = createCountryDto;
      const countryObj = {
        country_name: country_name,
        country_code: country_code
      }
      return await this.countryService.save(countryObj)
    } catch (err) {
      return err
    }
  }

  findAll() {
    return this.countryService.find({
      relations: {
        leader: true,
        cities: true
      }
    })
  }

  findOne(id: number) {
    return this.countryService.findOne({ where: { id: id } });
  }


}
