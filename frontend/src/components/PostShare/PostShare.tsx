import { EmojiEmotions, Label, PermMedia } from '@material-ui/icons';
import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './PostShare.css';
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';

function PostShare() {
	const [content, setContent] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [user, setUser] = useState<UserType>();

	const send = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.post(`users/${user?.id}/post`, {
			method: 'POST',
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
			content,
		});
		setContent('');
		setRedirect(true);
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

	// if (redirect) {
	// 	return <Redirect to="/home" />;
	// }
	return (
		<div className="post_container">
			<div className="post_wrapper">
				<div className="post_top">
					<img
						src={user?.profile_picture}
						alt="créateur du post"
						className="post_profile_picture"
					/>
					<input
						onChange={(e) => setContent(e.target.value)}
						placeholder={`A quoi pensez-vous ${user?.first_name}?`}
						type="text"
						className="post_input"
						value={content}
					/>
				</div>
				<hr className="post_hr" />
				<div className="post_bottom">
					<div className="post_options">
						<div className="post-option">
							<PermMedia
								htmlColor="tomato"
								className="post_icons"
							/>
							<span className="post_option-text">Photos</span>
						</div>
						<div className="post-option">
							<Label htmlColor="blue" className="post_icons" />
							<span className="post_option-text">Tag</span>
						</div>
						<div className="post-option">
							<EmojiEmotions
								htmlColor="goldenrod"
								className="post_icons"
							/>
							<span className="post_option-text">Réaction</span>
						</div>
					</div>
					<button onClick={send} className="btn post-btn">
						Poster
					</button>
				</div>
			</div>
		</div>
	);
}

export default PostShare;
