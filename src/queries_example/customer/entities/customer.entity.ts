import { Order } from "src/queries_example/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[]
}
