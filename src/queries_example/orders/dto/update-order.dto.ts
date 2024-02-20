import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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


}
