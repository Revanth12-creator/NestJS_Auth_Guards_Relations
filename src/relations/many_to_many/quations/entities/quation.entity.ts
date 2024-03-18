import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";

@Entity({ name: 'quations' })
export class Quation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    qua_title: string

    @Column({ nullable: false })
    qua_description: string

    @ManyToMany(() => Category, (category) => category.quations)
    @JoinTable({
        name: 'quation_category',
        joinColumn: {
            name: "quation_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "quation_category_quation_id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "quation_category_category_id"
        }
    })
    categories: Category[]
}
