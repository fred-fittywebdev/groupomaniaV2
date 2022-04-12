import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { IPosts, Post } from '../../Models/Post';
import PostShare from '../PostShare/PostShare';
import PostCard from '../Postcard/PostCard';
import './Feed.css';

interface IPosts {
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

function Feed() {
	const [user, setUser] = useState([]);

	const [posts, setPosts] = useState<IPosts['posts']>([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get('posts', {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setPosts(data.data);
			console.log(data.data);
		})();
	}, []);

	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem('first_name') || '');
	// 	if (user) {
	// 		setUser(user);
	// 		console.log(user);
	// 	}
	// }, []);

	return (
		<div className="feed">
			<h4 className="feed_welcome">Fil d'actualité.</h4>
			<PostShare />
			<PostCard posts={posts} />
		</div>
	);
}

export default Feed;
