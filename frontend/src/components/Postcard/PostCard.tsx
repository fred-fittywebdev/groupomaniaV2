import {
	AddAlert,
	AddComment,
	DeleteForever,
	Edit,
	Favorite,
	MoreVert,
	ThumbDown,
	ThumbDownOutlined,
	ThumbUp,
} from '@material-ui/icons';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';
import './postCard.css';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import moment from 'moment';
import 'moment/locale/fr';

import axios from 'axios';
moment.locale();

interface IProps {
	posts: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: number;
		posted_at: Date;
		is_reported: boolean;
		comments: Comment[];
		user: User | null;
	}[];
}
interface Comment {
	id: number;
	content: string;
	commented_at: Date;
	updated_at: Date;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	is_valid: boolean;
	warnings: number;
	profile_picture: string;
}

function PostCard({ posts }: IProps) {
	// const [like, setLike] = useState(false); // mettre le nombre de like
	const [user, setUser] = useState<UserType>();

	const deletPost = async (id: number) => {
		if (window.confirm('Vous aller supprimer ce post, en êtes vous sur?')) {
			await axios.delete(`post/${id}`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
		}

		posts.filter((posts) => posts.id !== id);
		window.location.reload();
	};

	const likePost = async (id: number) => {
		await axios.put(`post/${id}/like`, {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
		});
		// setLike(like);
		window.location.reload();
	};

	const disLikePost = async (id: number) => {
		await axios.put(`post/${id}/dislike`, {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
		});
		window.location.reload();
	};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (decoded) {
			setUser(decoded.user.id);
			console.log(decoded.user.id);
		}
	}, []);

	return (
		<>
			{posts.map((p) => {
				return (
					<div className="post">
						<div className="post-wrapper">
							<div key={p.id} className="post_top">
								<div className="post_top-left">
									<img
										className="post_profile_img"
										src={
											p.user?.profile_picture
												? p.user.profile_picture
												: '/assets/peach.png'
										}
										alt="auteur du post"
									/>

									<span className="post_username">
										{p.user?.first_name}
									</span>
									<span className="post_date">
										{moment(p.posted_at).format('LLL')}
									</span>
								</div>
								<div className="post_top_right">
									<Tippy
										arrow={false}
										className="tooltip"
										theme="light"
										interactive={true}
										placement="right"
										content={
											<span>
												Modifiez votre commentaire
											</span>
										}
									>
										<Edit htmlColor="green" />
									</Tippy>
								</div>
							</div>
							<div className="post_center">
								<img
									className="post_img"
									src={p.image}
									alt="couverture du post"
								/>
								<span className="post-text">{p.content}</span>
							</div>
							<div className="post_bottom">
								<div className="post_bottom_left">
									<ThumbUp
										className="like_icon"
										htmlColor="blue"
										onClick={() => likePost(p.id)}
									/>
									<span className="post_like_counter">
										{p.like} j'aime
									</span>
									<ThumbDownOutlined
										className="dislike_icon"
										htmlColor="gray"
										onClick={() => disLikePost(p.id)}
									/>
								</div>
								<div>
									<div className="post_bottom_center">
										<AddAlert
											htmlColor="tomato"
											className="warning_icon"
										/>
										<span className="post_comment_text">
											Signaler
										</span>
									</div>
								</div>
								<div
									className="post_bottom_right"
									style={
										p.user?.id !== user?.id
											? { display: 'none' }
											: { display: 'flex' }
									}
								>
									<DeleteForever
										htmlColor="red"
										className="warning_icon"
										onClick={() => deletPost(p.id)}
									/>
									<span className="post_comment_text">
										Supprimer
									</span>
								</div>
							</div>
							<hr className="post_hr" />
							<div className="post_comment_section">
								<span>Commentaires</span>
								<div>
									{p.comments.map((c) => {
										return (
											<span className="comment_section-content">
												{c.content}
											</span>
										);
									})}
								</div>
							</div>
							<hr className="post_hr" />
							<div className="post_comment-new">
								<input
									// onChange={(e) => setContent(e.target.value)}
									placeholder="Ajoutez votre commentaire.."
									type="text"
									className="post_new"
								/>
								<AddComment className="new-icon" />
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default PostCard;
