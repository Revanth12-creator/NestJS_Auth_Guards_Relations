import { IsDefined } from "class-validator"
import { Column } from "typeorm"

export class CreateCityDto {

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
