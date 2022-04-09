import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import Topbar from '../../components/Topbar/Topbar';
import DashHomepage from '../DashHomepage/DashHomepage';
import UserList from '../UserList/UserList';
import './Dashboard.css';

function Dashboard() {
	return (
		<BrowserRouter>
			<Topbar />
			<div className="container">
				<DashSidebar />
				<Switch>
					<Route path="/dashboard">
						<DashHomepage />
					</Route>
					<Route path="/user-list">
						<UserList />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Dashboard;
