import React from 'react';
import './Home.css';
import Topbar from '../../components/Topbar/Topbar';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from '../../components/Homepage/Homepage';
import Profil from '../Profil/Profil';

const Home = () => {
	return (
		<BrowserRouter>
			<Topbar />
			<div className="home_container">
				<DashSidebar />
				<Switch>
					<Route path="/home">
						<Homepage />
					</Route>
					<Route path="/profil">
						<Profil />
					</Route>
				</Switch>
				{/* <Feed />
				<RightBar /> */}
			</div>
		</BrowserRouter>
	);
};

export default Home;
