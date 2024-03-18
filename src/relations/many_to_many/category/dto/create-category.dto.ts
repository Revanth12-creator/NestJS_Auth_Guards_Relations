import { IsNotEmpty } from "class-validator"
import { Column } from "typeorm"

export class CreateCategoryDto {
    @IsNotEmpty()
    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @IsNotEmpty()
    @Column()
    quationId: number[]
}
