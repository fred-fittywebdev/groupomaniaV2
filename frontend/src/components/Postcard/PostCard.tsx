import { MoreVert } from '@material-ui/icons';
import React from 'react';
import './postCard.css';

function PostCard() {
	return (
		<div className="post">
			<div className="post-wrapper">
				<div className="post_top">
					<div className="post_top-left">
						<img
							className="post_profile_img"
							src="/assets/peach.png"
							alt="auteur du post"
						/>
						<span className="post_username">Stéphanie</span>
						<span className="post_date">Il y à 3 jours</span>
					</div>
					<div className="post_top_right">
						<MoreVert />
					</div>
				</div>
				<div className="post_center">
					<span className="post-text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Voluptate corrupti hic ab, aliquid odit voluptatem totam
						sed deserunt beatae fuga.
					</span>
					<img
						className="post_img"
						src="https://source.unsplash.com/random"
						alt="couverture du post"
					/>
				</div>
				<div className="post_bottom">
					<div className="post_bottom_left">
						<img
							className="like_icon"
							src="assets/like.png"
							alt=""
						/>
						<img
							className="like_icon"
							src="assets/heart.png"
							alt=""
						/>
						<span className="post_like_counter">
							4 personnes aiment
						</span>
					</div>
					<div className="postBottomRight">
						<span className="post_comment_text">
							10 commentaires
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostCard;
