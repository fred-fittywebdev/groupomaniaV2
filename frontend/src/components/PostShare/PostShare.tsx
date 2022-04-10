import { EmojiEmotions, Label, PermMedia } from '@material-ui/icons';
import React from 'react';
import './PostShare.css';

function PostCard() {
	return (
		<div className="post_container">
			<div className="post_wrapper">
				<div className="post_top">
					<img
						src="/assets/profil1.png"
						alt="créateur du post"
						className="post_profile_picture"
					/>
					<input
						placeholder="A quoi pensez-vous?"
						type="text"
						className="post_input"
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
					<button className="btn post-btn">Poster</button>
				</div>
			</div>
		</div>
	);
}

export default PostCard;
