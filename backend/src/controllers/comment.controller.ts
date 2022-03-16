import { create } from 'domain';
import { Response } from 'express';
import { Request } from 'express';
import { PassThrough } from 'nodemailer/lib/xoauth2';
import { getManager } from 'typeorm';
import { Comments } from '../entity/comments.entity';
import { Post } from '../entity/post.entity';

// On récupère tous les post
export const getComments = async (req: Request, res: Response) => {
        // mise en place de la pagination
        const take = 10
        const page = parseInt(req.query.page as string || '1')

        const repository = getManager().getRepository(Comments)

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

//On crée un commentaire sur un post précis
export const  CreateCommentPost = async (req: Request, res: Response) => {
    const { id } = req.params

    const { content } = req.body

    const post = await Post.findOne(parseInt(id))

    if (!post) {
        return res.json({
            message: 'Ce post n\'existe Pas.'
        })
    }

    const comment = Comments.create({
        content,
        post
    })

    await comment.save()
    await post.save()

    return res.json({
        message: 'Commentaire ajouté avec success'
    })
}

// On récupère un commentaire grâce a son import { second } from 'first'
export const GetComment = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Comments)

    res.send(await repository.findOne(req.params.id))
}

// ON modifie un Commentaire
export const UpdateComment = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Comments)

    await repository.update(req.params.id, req.body)

    res.status(202).send(await repository.findOne(req.params.id))
}

// On supprime un Commentaire
export const DeleteComment = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Comments)

    await repository.delete(req.params.id)

    res.status(204).send(null)
}
