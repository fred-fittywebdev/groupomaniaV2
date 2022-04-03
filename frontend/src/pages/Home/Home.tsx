import React from 'react';
import './Home.css';
import Feed from '../../components/Feed/Feed';
import RightBar from '../../components/RightBar/RightBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';

const Home = () => {
	return (
		<div>
			<Topbar />
			<div className="home_container">
				<Sidebar />
				<Feed />
				<RightBar />
			</div>
		</div>
	);
};

export default Home;
