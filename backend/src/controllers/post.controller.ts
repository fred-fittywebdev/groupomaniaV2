import { Post } from './../entity/post.entity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import { send } from 'process';

// On récupère tous les posts
export const Posts = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Post)

    const posts = await repository.find()

    res.send(posts)
}

// On crée un Post
export const CreatePost = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Post)

    const post = await repository.save(req.body)

    res.status(201).send(post)
}

// On récupère un post grâce a son ID
export const GetPost = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Post)

    res.send(await repository.findOne(req.params.id))
}

// ON modifie un Post
export const UpdatePost = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Post)

    await repository.update(req.params.id, req.body)

    res.status(202).send(await repository.findOne(req.params.id))
}

// On supprime un Post
export const DeletePost = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Post)

    await repository.delete(req.params.id)

    res.status(204).send(null)
}