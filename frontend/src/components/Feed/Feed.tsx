import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { IPosts, Post } from '../../Models/Post';
import PostShare from '../PostShare/PostShare';
import PostCard from '../Postcard/PostCard';
import './Feed.css';
import Paginator from '../Paginator/Paginator';
import UserType from '../../Types/UserType';

interface IPosts {
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

function Feed() {
	const [user, setUser] = useState([]);

	const [posts, setPosts] = useState<IPosts['posts']>([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`posts?page=${page}`, {
				// () pour récupérer les data directement. avec .data
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setPosts(data.data);
			setLastPage(data.meta.last_page);
			console.log(data.data);
		})();
		// Pour changer de page on doit rappeller le useEffect a chaque changement, on met donc les pages en dépendences. -> Chaque fois que les pages changent le UE est appelé
	}, [page]);

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

	// Mise en place de la pagination faite dans le back
	// const next = () => {
	// 	if (page < lastPage) {
	// 		setPage(page + 1);
	// 	}
	// };

	// const prev = () => {
	// 	if (page >= 1) {
	// 		setPage(page - 1);
	// 	}
	// };

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
			<PostCard posts={posts} deletPost={deletPost} />
			<Paginator
				page={page}
				lastPage={lastPage}
				pageChanged={(page) => setPage(page)}
			/>
			{/* <nav className="page_nav">
				<ul className="page_nav-list">
					<li className="page_nav-items">
						<a href="#" className="btn" onClick={prev}>
							Precédent
						</a>
					</li>
					<li className="page_nav-items">
						<a href="#" className="btn page_btn" onClick={next}>
							Suivant
						</a>
					</li>
				</ul>
			</nav> */}
		</div>
	);
}

export default Feed;
