import { PartialType } from '@nestjs/mapped-types';
import { Column } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column()
  address: string;
}
