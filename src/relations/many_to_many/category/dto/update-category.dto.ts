import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
import { CreateCategoryDto } from './create-category.dto';
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty()
    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @IsNotEmpty()
    @Column()
    quationId: number[]
}
