import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string

    @IsNotEmpty()
    @IsString()
    @Column()
    email: string

    @IsNotEmpty()
    @IsNumber()
    @Column()
    mobile_number: string
}
