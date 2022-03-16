import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comments } from "./comments.entity";
import { User } from "./user.entity";


@Entity()
export class Post extends BaseEntity {
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

    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => Comments, comment => comment.post)
    comments: Comments[]
}