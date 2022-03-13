import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('text')
    content: string

    @Column({
        nullable: true,
        default: 'img/posts.post1.png'
    })
    image: string

    @Column({
        default: 0
    })
    like: number

    @Column({
        default: 0
    })
    is_reported: number

    @CreateDateColumn()
    posted_at: Date

    @UpdateDateColumn()
    updated_at: Date
}