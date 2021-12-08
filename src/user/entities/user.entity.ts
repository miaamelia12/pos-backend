import { Konsuman } from "src/konsumen/entities/konsuman.entity";
import { Produk } from "src/produk/entities/produk.entity";
import { Rekening } from "src/rekening/entities/rekening.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_user: string

    @Column()
    email: string

    @Column()
    username: string

    @Column({select:false})
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(()=> Produk, prod => prod.id)
    produk: Produk

    @OneToMany(()=> Konsuman, kons => kons.id)
    konsumen: Konsuman

    @OneToMany(()=> Rekening, rek => rek.id)
    rekening: Rekening
}
