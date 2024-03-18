import { PartialType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import { Column } from 'typeorm';
import { CreateCityDto } from './create-city.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @IsDefined()
    @Column()
    city_name: string

    @IsDefined()
    @Column()
    city_pincode: string

    @IsDefined()
    @Column()
    country_id: number
}
