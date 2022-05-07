import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import ProfilUser from '../../components/Profiluser/ProfilUser';
import Topbar from '../../components/Topbar/Topbar';
import Homepage from '../../components/Homepage/Homepage';
import './Profil.css';

function Profil() {
	return (
		<BrowserRouter>
			<Topbar />
			<div className="profileRight">
				<DashSidebar />
				<Switch>
					<Route path="/home">
						<Homepage />
					</Route>
					<Route path="/profil">
						<ProfilUser />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Profil;
