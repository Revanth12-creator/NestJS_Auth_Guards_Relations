import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'quation_category' })
export class QuationCategory {
    @PrimaryGeneratedColumn()
    id: number
}