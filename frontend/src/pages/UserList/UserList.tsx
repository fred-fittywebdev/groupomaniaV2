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
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setUsersList(data.data);
			console.log(data.data[0].role);
		})();
	}, []);

	return (
		<div className="user_list">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Photo</th>
						<th>Prénom</th>
						<th>Nom</th>
						<th>Pseudo</th>
						<th>Email</th>
						<th>Valide</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{usersList.map((usersList: User) => {
						return (
							<tr key={usersList.id}>
								<td>{usersList.id}</td>
								<td>
									<img
										src={usersList.profile_picture}
										width="50"
									/>
								</td>
								<td>{usersList.first_name}</td>
								<td>{usersList.last_name}</td>
								<td>{usersList.username}</td>
								<td>{usersList.email}</td>
								<td
									style={
										!usersList.is_valid
											? {
													backgroundColor: '#fd2d01',
													color: 'white',
													textAlign: 'center',
											  }
											: { backgroundColor: 'white' }
									}
								>
									{usersList.is_valid.toString()}
								</td>
								<td>
									<button className="btn">Supprimer</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default UserList;
