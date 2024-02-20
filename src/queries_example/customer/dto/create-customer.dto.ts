import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string

    @IsNotEmpty()
    @IsString()
    @Column()
    email: string

    @IsString()
    @IsNotEmpty()
    @Column()
    mobile_number: string

}
