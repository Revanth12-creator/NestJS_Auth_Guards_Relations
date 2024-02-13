import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateLoginUserDto {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    first_name: string

    @Column()
    @IsNotEmpty()
    last_name: string

}
