import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    @Column()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Column()
    price: number

    @IsNotEmpty()
    @IsString()
    @Column()
    address: string

    @IsNotEmpty()
    @IsString()
    @Column()
    customer_id: string
}
