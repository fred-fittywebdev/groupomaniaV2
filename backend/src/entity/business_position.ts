import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Departments {
    RETAIL = 'retail',
    MARKETING = 'marketing',
    IT = 'it',
    SALES = 'sales',
    FINANCE = 'finance',
    RH = 'rh'
}

@Entity()
export class BusinessPosition extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: Departments
    })
    type: string

    @OneToMany(() => User, user => user.position)
    positions: User[]
}