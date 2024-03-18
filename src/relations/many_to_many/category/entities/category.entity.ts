import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quation } from "../../quations/entities/quation.entity";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    description: string

    @ManyToMany(() => Quation, (quations) => quations.categories)
    quations: Quation[]
}
