import React from 'react';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import Topbar from '../../components/Topbar/Topbar';
import DashHomepage from '../DashHomepage/DashHomepage';
import './Dashboard.css';

function Dashboard() {
	return (
		<div>
			<Topbar />
			<div className="container">
				<DashSidebar />
				<DashHomepage />
			</div>
		</div>
	);
}

export default Dashboard;
