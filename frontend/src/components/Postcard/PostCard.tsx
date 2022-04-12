import { MoreVert } from '@material-ui/icons';
import React from 'react';
import './postCard.css';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale();

interface IProps {
	posts: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: boolean;
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
	return (
		<>
			{posts.map((p) => {
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
									<span className="post_username">
										{p.user?.first_name}
									</span>
									<span className="post_date">
										{moment(p.posted_at)
											.startOf('day')
											.fromNow()}
									</span>
								</div>
								<div className="post_top_right">
									<MoreVert />
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
										{p.like} j'aime
									</span>
								</div>
								<div className="postBottomRight">
									<span className="post_comment_text">
										Commenter
									</span>
								</div>
							</div>
							<hr className="post_hr" />
							<div className="post_comment_section">
								<span>Les plus pertinents:</span>
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
						</div>
					</div>
				);
			})}
		</>
	);
}

export default PostCard;
