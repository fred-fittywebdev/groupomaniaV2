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
import React, {
	SyntheticEvent,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import moment from 'moment';
import 'moment/locale/fr';

import axios from 'axios';
moment.locale();

interface IProps {
	post: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: number;
		posted_at: Date;
		is_reported: boolean;
		comments: Comment[];
		user: User | null;
	};
	deletPost: (id: number) => void;
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

const PostUnique = ({ post: p, deletPost }: IProps) => {
	const [user, setUser] = useState<UserType>();

	//modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	// satte pour la fonction like/dislike
	const [like, setLike] = useState(p.like);
	const [isLiked, setIsLiked] = useState(false);

	// state pour la fonction signalement du post
	const [isReported, setIsReported] = useState(false);

	//comment
	const [content, setContent] = useState('');

	const likeHandler = async (id: number) => {
		if (!isLiked) {
			await axios.put(`post/${id}/like`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setLike(like + 1);
			setIsLiked(true);
		} else {
			await axios.put(`post/${id}/dislike`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setLike(like - 1);
			setIsLiked(false);
		}
	};

	const reportPost = async (id: number) => {
		if (isReported) {
			toast.warning('Vous avez déjà signalé ce post');
			return;
		}
		if (
			window.confirm(
				'Vous êtes sur le point de signaler ce post, continuer?'
			)
		) {
			if (!isReported) {
				await axios.put(`post/${id}/report`, {
					headers: {
						Authorization:
							'Bearer ' +
							JSON.parse(localStorage.getItem('token') || ''),
					},
				});
				setIsReported(true);
				toast.success("Le pot a bien été signalé a l'administrateur");
			}
		}
	};

	const addComment = async (id: number) => {
		await axios.post(`posts/${id}/comment`, {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
			content,
		});
		setContent(content);
		console.log(content);
		window.location.reload();
	};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (decoded) {
			setUser(decoded.user);
			console.log(user?.first_name);
		}
	}, []);
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
							content={<span>Modifiez votre post</span>}
						>
							<Edit htmlColor="green" onClick={toggleModal} />
						</Tippy>
					</div>
				</div>
				<div className="post_center">
					{/* TODO: conditionner l'image au cas ou le post n'en contiendrait pas */}
					{p.image && (
						<img
							className="post_img"
							src={p.image}
							alt="couverture du post"
						/>
					)}
					<span className="post-text">{p.content}</span>
				</div>
				<div className="post_bottom">
					<div className="post_bottom_left">
						<ThumbUp
							className="like_icon"
							htmlColor="blue"
							onClick={() => likeHandler(p.id)}
						/>
						<span className="post_like_counter">{like} j'aime</span>
					</div>
					<div>
						<div className="post_bottom_center">
							<AddAlert
								htmlColor="tomato"
								className="warning_icon"
								onClick={() => reportPost(p.id)}
							/>
							<span className="post_comment_text">Signaler</span>
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
						<span className="post_comment_text">Supprimer</span>
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
				<form className="post_comment-new">
					<input
						onChange={(e) => setContent(e.target.value)}
						placeholder="Ajoutez votre commentaire.."
						type="text"
						className="post_new"
					/>
					<AddComment
						onClick={(e) => addComment(p.id)}
						className="new-icon"
					/>
				</form>
			</div>
		</div>
	);
};

export default PostUnique;
