import { IsDefined } from 'class-validator';
import { Column } from 'typeorm';
export class CreateCountryDto {

    @Column()
    @IsDefined()
    country_name: string

    @Column()
    @IsDefined()
    country_code: string
}
