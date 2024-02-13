import { IsEmail, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateAuthDto {
    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @Column()
    @IsNotEmpty()
    password: string

}
