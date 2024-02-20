import { City } from "src/relations/one_to_many/cities/entities/city.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Leader } from './../../leaders/entities/leader.entity';

@Entity({ name: 'country' })
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    country_name: string

    @Column({ nullable: false })
    country_code: string

    @OneToOne(() => Leader, (leader) => leader.country)
    leader: Leader

    @OneToMany(() => City, (cities) => cities.country)
    cities: City[]
}
