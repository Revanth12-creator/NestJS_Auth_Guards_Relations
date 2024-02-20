import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {

    @PrimaryGeneratedColumn('uuid')
    orderId: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false })
    address: string
}
