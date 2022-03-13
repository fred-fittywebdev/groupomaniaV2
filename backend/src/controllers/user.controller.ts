import { User } from './../entity/user.entity';
import { getManager } from 'typeorm';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'

// Ici on est sur le CRUD des utilisateur en général, seul un utilisateur authentifié peut le faire


// Récupérer tous les utilisateurs de l'application
export const Users = async (req: Request, res: Response) => {
    // pagination
    const take = 10
    const page = parseInt(req.query.page as string || '1')

    const repository = getManager().getRepository(User)

    const [data, total] = await repository.findAndCount({
        take: take,
        skip: (page - 1) * take, // On précise le début, si la page est sur un on part de zéro, si elle est sur 2 on montrera les produits a partir du quinzième,
        relations: ['role']
    })

    // const users = await repository.find({
    //     relations: ['role'] // On fait une relation avec la colonne role de l'entity pour le récupérer
    // })

    // On boucle sur tous les users pour ne pas afficher le mot de passe

    res.send({
        data: data.map(u => {
            const {password, ...data} = u

            return data
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    })
}

// Création d'un utilisateur
export const CreateUser = async (req: Request, res: Response) => {
    // On attribue un role a nos utilisateurs et un mdp prédéfini
    const {role_id, ...body} = req.body
    const hashedPassword = await bcryptjs.hash('bienvenue', 12)

    const repository = getManager().getRepository(User)

    const {password, ...user} = await repository.save({
        ...body,
        password: hashedPassword,
        role: {
            id: role_id // On crée un objet pour pouvoir assigner un role lors de la création du user
        }
    })

    res.status(201).send(user)
}

// Récuperer un utilsateur grâce a son id
export const GetUser = async (req: Request, res: Response) => {

    const repository = getManager().getRepository(User)

    const {password, ...user} = await repository.findOne(req.params.id, {relations: ['role']})

    res.send(user)
}

// On modifie un utilisateur
export const UpdateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body
    const repository = getManager().getRepository(User)

    await repository.update(req.params.id, {
        ...body,
        role: {
            id: role_id
        }
    })

    const {password, ...user} = await repository.findOne(req.params.id, {relations: ['role']})

    res.status(202).send(user)
}

// On supprime un utilisateur
export const DeleteUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User)

    await repository.delete(req.params.id)

    res.status(204).send(null)
}