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
    return this.cityService.findOne({
      relations: {
        country: true
      },
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const { city_name, city_pincode, country_id } = updateCityDto;
    const updateObj = {
      city_name, city_pincode, country_id
    }
    let updateCities = await this.cityService.update(id, updateObj);
    if (updateCities.affected == 1) {
      return { statusCode: 200, message: 'Updated Succesfully' }
    } else {
      return { statusCode: 400, message: 'Something went wrong' }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
