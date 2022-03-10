import { Register, Login } from './../controllers/auth.controller';
import { Router } from 'express'

export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
}