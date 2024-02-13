import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
import { CreateLoginUserDto } from './create-login_user.dto';

export class UpdateLoginUserDto extends PartialType(CreateLoginUserDto) {
    @Column()
    @IsNotEmpty()
    first_name: string

    @Column()
    @IsNotEmpty()
    last_name: string
}
