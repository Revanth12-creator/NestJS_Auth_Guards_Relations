import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'customer' })
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    mobile_number: string

}
