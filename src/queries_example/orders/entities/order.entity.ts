import { Customer } from "src/queries_example/customer/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ nullable: false })
    customer_id: string

    @ManyToOne(() => Customer, (customer) => customer.orders)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer
}
