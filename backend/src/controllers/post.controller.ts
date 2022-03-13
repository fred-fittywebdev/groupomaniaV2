import { Post } from './../entity/post.entity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import { send } from 'process';

// On récupère tous les posts
export const Posts = async (req: Request, res: Response) => {
    // mise en place de la pagination
    const take = 10
    const page = parseInt(req.query.page as string || '1')

    const repository = getManager().getRepository(Post)

    const [data, total] = await repository.findAndCount({
        take: take,
        skip: (page - 1) * take // On précise le début, si la page est sur un on part de zéro, si elle est sur 2 on montrera les produits a partir du quinzième
    })

    res.send({
        data: data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    })
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