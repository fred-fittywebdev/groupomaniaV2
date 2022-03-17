import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    content: string

    @CreateDateColumn()
    commented_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({name: 'post_id'})
    post: Post

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user: User
    
}