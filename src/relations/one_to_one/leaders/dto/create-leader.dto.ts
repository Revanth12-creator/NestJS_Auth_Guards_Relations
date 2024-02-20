import { IsDefined, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class CreateLeaderDto {

    @IsString()
    @Column()
    leader_fname: string

    @IsString()
    @Column()
    leader_lname: string

    @IsString()
    @Column()
    phone_no: string

    @IsDefined()
    @Column()
    country_id: number
}
