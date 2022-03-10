import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import { RegistrationValidation } from "../validation/registration.validation";
import bcryptjs from 'bcryptjs'

// Validate infos on registration with express-validate
export const Register = async (req: Request, res: Response) => {
    const body = req.body

    const {error} = RegistrationValidation.validate(body)
    if (error) {
        return res.status(400).send(error.details)
    }

    if (body.password != body.password_confirm) {
        return res.status(400).send({
            message: "Les mots de passe ne correspondent pas."
        })
    }

    const repository = getManager().getRepository(User)

    const {password, ...user} = await repository.save({ // on déconstruit l'objet User pour enlever le passwor avec le spread operator
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 12),
        is_valid: body.is_valid

    })
    
    res.send(user)
}

export const Login = async (req: Request, res: Response) => {
    // On récupère le repository user
    const repository = getManager().getRepository(User)

    // On trouve le premier user dont l'email correspond au contenu de la requête
    const user = await repository.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: `identifiants erronés.`
        })
    }

    if(!user.is_valid) {
        return res.status(400).send({
            message: 'Vous avez été temporairement bloqué par le modérateur du site'
        })
    }

    if(!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Identifiants erronés'
        })
    }

    const {password, ...data} = user

    res.send(data)
}