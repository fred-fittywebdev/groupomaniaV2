import { Upload } from './../controllers/image.controller';
import { CreateRole, DeleteRole, GetRole, UpdateRole } from './../controllers/role.controller';

import { Users, CreateUser, GetUser, UpdateUser, DeleteUser } from './../controllers/user.controller';
import { AuthMiddleware } from './../middleware/auth.middleware';
import { Register, Login, AuthenticatedUser, Logout, UpdateInfo, UpdatePassword } from './../controllers/auth.controller';
import { Request, Router } from 'express'
import { Forgot, ResetPassword } from '../controllers/forgot.controller';
import { Permissions } from '../controllers/permission.controller';
import { Roles } from '../controllers/role.controller';
import { CreatePost, DeletePost, GetPost, Posts, UpdatePost } from '../controllers/post.controller';


export const routes = (router: Router) => {
    // Authenticated user
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout',AuthMiddleware, Logout)
    router.put('/api/users/info',AuthMiddleware, UpdateInfo)
    router.put('/api/users/password',AuthMiddleware, UpdatePassword)
    // Forgot password
    router.post('/api/forgot', Forgot)
    router.post('/api/reset', ResetPassword)
    // Permissions et Rôles
    router.get('/api/permissions',AuthMiddleware, Permissions)
    router.get('/api/roles', AuthMiddleware, Roles)
    router.post('/api/roles', AuthMiddleware, CreateRole)
    router.get('/api/roles/:id', AuthMiddleware, GetRole)
    router.put('/api/roles/:id',AuthMiddleware, UpdateRole)
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole)

    // All other Users
    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/users', AuthMiddleware, CreateUser)
    router.get('/api/users/:id', AuthMiddleware, GetUser)
    router.put('/api/users/:id', AuthMiddleware, UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser)

    // Post routes
    router.get('/api/posts', AuthMiddleware, Posts)
    router.post('/api/posts', AuthMiddleware, CreatePost)
    router.get('/api/post/:id', AuthMiddleware, GetPost)
    router.put('/api/post/:id', AuthMiddleware, UpdatePost)
    router.delete('/api/post/:id', AuthMiddleware, DeletePost)

    //Images Upload
    router.post('/api/upload',AuthMiddleware, Upload)
}