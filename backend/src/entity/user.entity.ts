import { Role } from './role.entity';
import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({
        nullable: true,
        default: "username"
    })
    username: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({
        default: true
    })
    is_valid: boolean

    @Column({
        default: 0
    })
    warnings: number

    @Column({
        nullable: true,
        default: "img/profil/moi.png"
    })
    profile_picture: string

    @ManyToOne(() => Role) // Ici un utilsateur ne peut avoir qu'un seul role, alors qu'un rôle peut être assigné a plusieurs utilisateurs
    @JoinColumn({name: 'role_id'}) // On spécifie comment on veut appeler la colonne
    role: Role

}