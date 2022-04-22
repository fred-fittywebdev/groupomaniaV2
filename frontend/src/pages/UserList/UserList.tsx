import React, { useEffect, useState } from 'react';
import './UserList.css';

import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../Models/User';
import PostCard from '../../components/PostShare/PostShare';

function UserList() {
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get('users', {
				headers: {
					Authorization: localStorage.getItem('token') || '',
				},
			});
			setUsersList(data.data);
			console.log(data.data[0].role);
		})();
	}, []);

	return (
		<div className="user_list">
			{usersList.map((usersList: User) => {
				return (
					<div key={usersList.id}>
						<li>{usersList.id}</li>
						<li>{usersList.first_name}</li>
						<li>{usersList.last_name}</li>
						<li>{usersList.username}</li>
						<li>{usersList.email}</li>
						<li>{usersList.is_valid.toString()}</li>
						<li>{usersList.warnings}</li>
						<li>{usersList.profile_picture}</li>
					</div>
				);
			})}
		</div>
	);
}

export default UserList;
