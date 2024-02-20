import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from './../../country/entities/country.entity';

@Entity({ name: 'leaders' })
export class Leader {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    leader_fname: string

    @Column({ nullable: false })
    leader_lname: string

    @Column({ nullable: false })
    phone_no: string

    @Column({ name: 'country_id' })
    country_id: number

    @OneToOne(() => Country, (country) => country.leader)
    @JoinColumn({ name: 'country_id' })
    country: Country
}
