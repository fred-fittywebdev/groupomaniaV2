import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPosts, Post } from '../../Models/Post';
import './Feed.css';

function Feed() {
	const [user, setUser] = useState([]);

	const [posts, setPosts] = useState<IPosts[]>([]);

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
		})();
	}, []);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('first_name') || '');
		if (user) {
			setUser(user);
			console.log(user);
		}
	}, []);

	return (
		<div className="feed">
			<p>Bienvenue: {user}</p>
			<ul>
				{posts.map((p: Post) => {
					return (
						<div key={p.id}>
							<li>ID: {p.id}</li>
							<li>Titre: {p.title}</li>
							<li>Contenu: {p.content}</li>
							<li>
								Photo:{' '}
								<img
									alt="couverture du blog"
									src={p.image}
									width="75"
									height={75}
								></img>
							</li>
							<li>Likes: {p.like}</li>
							<li>Posté le: {p.posted_at}</li>
							<li>Signalé: {p.is_reported}</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
}

export default Feed;
