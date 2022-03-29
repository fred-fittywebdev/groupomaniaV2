import { PermissionMiddleware } from './../middleware/permission.middleware';
import {
	DislikePost,
	LikePost,
	reportPost,
} from './../controllers/post.controller';
import {
	CreateUSerComment,
	DeleteComment,
	GetComment,
	getComments,
	UpdateComment,
} from './../controllers/comment.controller';
import { Upload } from './../controllers/image.controller';
import {
	CreateRole,
	DeleteRole,
	GetRole,
	UpdateRole,
} from './../controllers/role.controller';
import express from 'express';
import {
	Users,
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
	ExportUser,
} from './../controllers/user.controller';
import { AuthMiddleware } from './../middleware/auth.middleware';
import {
	Register,
	Login,
	AuthenticatedUser,
	Logout,
	UpdateInfo,
	UpdatePassword,
} from './../controllers/auth.controller';
import { Request, Router } from 'express';
import { Forgot, ResetPassword } from '../controllers/forgot.controller';
import { Permissions } from '../controllers/permission.controller';
import { Roles } from '../controllers/role.controller';
import {
	CreatePost,
	CreatePostUser,
	DeletePost,
	GetPost,
	Posts,
	UpdatePost,
} from '../controllers/post.controller';
import { CreateCommentPost } from '../controllers/comment.controller';

export const routes = (router: Router) => {
	// Authenticated user
	router.post('/api/register', Register);
	router.post('/api/login', Login);
	router.get('/api/user', AuthMiddleware, AuthenticatedUser);
	router.post('/api/logout', AuthMiddleware, Logout);
	router.put('/api/users/info', AuthMiddleware, UpdateInfo);
	router.put('/api/users/password', AuthMiddleware, UpdatePassword);
	// Forgot password
	router.post('/api/forgot', Forgot);
	router.post('/api/reset', ResetPassword);
	// Permissions et Rôles
	router.get(
		'/api/permissions',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		Permissions
	);
	router.get(
		'/api/roles',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		Roles
	);
	router.post(
		'/api/roles',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		CreateRole
	);
	router.get(
		'/api/roles/:id',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		GetRole
	);
	router.put(
		'/api/roles/:id',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		UpdateRole
	);
	router.delete(
		'/api/roles/:id',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		DeleteRole
	);

	// All other Users
	router.get('/api/users', AuthMiddleware, Users); // A mettre a la fin PermissionMiddleware('roles'),
	router.post(
		'/api/users',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		CreateUser
	);
	router.get(
		'/api/users/:id',
		AuthMiddleware,
		PermissionMiddleware('users'),
		GetUser
	);
	router.put(
		'/api/users/:id',
		AuthMiddleware,
		PermissionMiddleware('users'),
		UpdateUser
	);
	router.delete(
		'/api/users/:id',
		AuthMiddleware,
		PermissionMiddleware('users'),
		DeleteUser
	);

	// Export csv des utilisateurs
	router.post(
		'/api/export',
		AuthMiddleware,
		PermissionMiddleware('roles'),
		ExportUser
	);

	// Post routes
	router.get(
		'/api/posts',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		Posts
	);
	router.post(
		'/api/users/:id/post',
		AuthMiddleware,
		PermissionMiddleware('users'),
		CreatePostUser
	);
	router.post(
		'/api/users/:id/comment',
		AuthMiddleware,
		PermissionMiddleware('users'),
		CreateUSerComment
	);
	router.post(
		'/api/posts',
		AuthMiddleware,
		PermissionMiddleware('users'),
		CreatePost
	);
	router.get(
		'/api/post/:id',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		GetPost
	);
	router.put(
		'/api/post/:id',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		UpdatePost
	);
	router.delete(
		'/api/post/:id',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		DeletePost
	);
	router.put(
		'/api/post/:id/report',
		AuthMiddleware,
		PermissionMiddleware('users'),
		reportPost
	);
	// On like un post
	router.put(
		'/api/post/:id/like',
		AuthMiddleware,
		PermissionMiddleware('users'),
		LikePost
	);
	// On dislike un post
	router.put(
		'/api/post/:id/dislike',
		AuthMiddleware,
		PermissionMiddleware('users'),
		DislikePost
	);
	// Comment routes
	router.get(
		'/api/comments',
		AuthMiddleware,
		PermissionMiddleware('users'),
		getComments
	);
	router.post(
		'/api/posts/:id/comment',
		AuthMiddleware,
		PermissionMiddleware('users'),
		CreateCommentPost
	);
	router.get(
		'/api/comments/:id',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		GetComment
	);
	router.put(
		'/api/comments/:id',
		AuthMiddleware,
		PermissionMiddleware('users'),
		UpdateComment
	);
	router.delete(
		'/api/comments/:id',
		AuthMiddleware,
		PermissionMiddleware('posts'),
		DeleteComment
	);

	//Images Upload
	router.post('/api/upload', AuthMiddleware, Upload);
	// Route statique pour les Images
	router.use('/api/uploads', express.static('./uploads'));
};
