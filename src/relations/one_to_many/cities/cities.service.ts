import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private cityService: Repository<City>) {
  }
  async create(createCityDto: CreateCityDto) {
    try {
      let { city_name, city_pincode, country_id } = createCityDto;
      const createCity = {
        city_name, city_pincode, country_id
      };
      const city = await this.cityService.create(createCity);
      return this.cityService.save(city)
    } catch (err) {
      return err
    }
  }

  findAll() {
    return this.cityService.find({
      relations: {
        country: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
