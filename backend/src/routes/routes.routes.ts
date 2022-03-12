import { Users, CreateUser, GetUser, UpdateUser, DeleteUser } from './../controllers/user.controller';
import { AuthMiddleware } from './../middleware/auth.middleware';
import { Register, Login, AuthenticatedUser, Logout, UpdateInfo, UpdatePassword } from './../controllers/auth.controller';
import { Router } from 'express'
import { Forgot, ResetPassword } from '../controllers/forgot.controller';

export const routes = (router: Router) => {
    // Authenticated user
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout',AuthMiddleware, Logout)
    router.put('/api/users/info',AuthMiddleware, UpdateInfo)
    router.put('/api/users/password',AuthMiddleware, UpdatePassword)
    router.post('/api/forgot', Forgot)
    router.post('/api/reset', ResetPassword)

    // All other Users
    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/users', AuthMiddleware, CreateUser)
    router.get('/api/users/:id', AuthMiddleware, GetUser)
    router.put('/api/users/:id', AuthMiddleware, UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser)
}