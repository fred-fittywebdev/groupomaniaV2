import React from 'react';
import './UserList.css';

import {
	DataGrid,
	GridColDef,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function UserList() {
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 130 },
		{ field: 'firstName', headerName: 'First name', width: 200 },
		{ field: 'lastName', headerName: 'Last name', width: 200 },
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 130,
		},
		{
			field: 'rôle',
			headerName: 'Rôles',
			width: 130,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/user/' + params.row.id}>
							<button className="btn user-list-btn">
								Modifier
							</button>
						</Link>
						<Delete className="user-list-delete" />
					</>
				);
			},
		},
	];

	const rows = [
		{
			id: 1,
			lastName: 'Snow',
			firstName: 'Jon',
			email: 'jon.snow@example.com',
			status: 'actif',
			rôle: 'membre',
		},
	];

	return (
		<div className="user_list">
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[10]}
				checkboxSelection
				disableSelectionOnClick
			/>
		</div>
	);
}

export default UserList;
