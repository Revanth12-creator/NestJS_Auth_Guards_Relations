import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name:"user"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column()
  address: string;
}
