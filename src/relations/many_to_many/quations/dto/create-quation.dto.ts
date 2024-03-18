import { IsDefined } from "class-validator"
import { Column } from "typeorm"

export class CreateQuationDto {

    @IsDefined()
    @Column({ nullable: false })
    qua_title: string

    @IsDefined()
    @Column({ nullable: false })
    qua_description: string
}
