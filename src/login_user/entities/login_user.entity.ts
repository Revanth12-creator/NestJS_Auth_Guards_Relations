import * as bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'login_user'})
export class LoginUser {
    @PrimaryGeneratedColumn('uuid')
    userId: string
    
    @Column({ nullable: false, unique: true, length: 30 })
    email: string

    @Column({ nullable: false, length: 100 })
    password: string
    
    @Column({ nullable: false, length: 30 })
    first_name: string
    
    @Column({ nullable: false, length: 30 })
    last_name: string

    @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
    
    @Column({nullable: false,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP()",
        onUpdate: "CURRENT_TIMESTAMP()"
    })
    updated_at: Date
    
    @Column({ nullable: true})
    token: string
    
    @BeforeInsert()
     async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // hashed password
    }
}
