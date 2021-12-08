import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rekening {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nama_rekening: string

    @Column()
    keterangan_rekening: string

    @Column()
    type_rekening: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date

    @ManyToOne(()=> User, usr => usr.id)
    user: User
}
