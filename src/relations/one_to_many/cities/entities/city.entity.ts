import { Country } from "src/relations/one_to_one/country/entities/country.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cities' })
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    city_name: string

    @Column({ nullable: false })
    city_pincode: string

    @Column({ name: 'country_id', nullable: false })
    country_id: number

    @ManyToOne(() => Country, (country) => country.cities)
    @JoinColumn({ name: 'country_id' })
    country: Country
}
