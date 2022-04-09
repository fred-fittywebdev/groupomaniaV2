import {
	Adb,
	Add,
	BugReport,
	CardMembership,
	Create,
	Equalizer,
	Face,
	Group,
	Help,
	LineStyle,
	MenuBook,
	PowerSettingsNew,
	RssFeed,
	Warning,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashSidebar.css';

function DashSidebar() {
	const [userRole, setUserRole] = useState('');

	useEffect(() => {
		const userRole = JSON.parse(localStorage.getItem('role') || '');
		if (userRole) {
			setUserRole(userRole);
		}
	}, []);

	const [user, setUser] = useState([]);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('first_name') || '');
		if (user) {
			setUser(user);
		}
	}, []);

	return (
		<>
			<div className="dash_sidebar">
				<div className="dash_sidebar-wrapper">
					{(userRole === 'Admin' || userRole === 'Moderateur') && (
						<div className="dash_sidebar-menu">
							<h3 className="dash_sidebar-title">Connecté</h3>
							<span className="dash_sidebar-username">
								<Face className="dash_sidebar-icons" />
								{user}: {userRole}
							</span>
							<h3 className="dash_sidebar-title">Menu Rapide</h3>
							<ul className="dash_sidebar-list">
								<NavLink
									exact={true}
									activeClassName="active"
									to="/dashboard"
								>
									<li className="dash_sidebar-item active">
										<LineStyle className="dash_sidebar-icons" />
										Acceuil
									</li>
								</NavLink>
								<NavLink
									activeClassName="active"
									to="/user-list"
								>
									<li className="dash_sidebar-item">
										<Group className="dash_sidebar-icons" />
										Membres
									</li>
								</NavLink>
								<NavLink
									exact={true}
									activeClassName="active"
									to="/post-list"
								>
									<li className="dash_sidebar-item">
										<MenuBook className="dash_sidebar-icons" />
										Posts
									</li>
								</NavLink>
							</ul>
						</div>
					)}
					{(userRole === 'Admin' || userRole === 'Moderateur') && (
						<div className="dash_sidebar-menu">
							<h3 className="dash_sidebar-title">Staff</h3>
							<ul className="dash_sidebar-list">
								<li className="dash_sidebar-item">
									<CardMembership className="dash_sidebar-icons" />
									Rôles
								</li>
								<li className="dash_sidebar-item">
									<Add className="dash_sidebar-icons" />
									Ajouter un utilisateur
								</li>
								<li className="dash_sidebar-item">
									<Warning className="dash_sidebar-icons" />
									Signalements
								</li>
								<li className="dash_sidebar-item">
									<Equalizer className="dash_sidebar-icons" />
									Data
								</li>
							</ul>
						</div>
					)}
					{userRole !== 'Admin' && userRole !== 'Moderateur' && (
						<div className="dash_sidebar-menu">
							<h3 className="dash_sidebar-title">Menu</h3>
							<ul className="dash_sidebar-list">
								<NavLink
									exact={true}
									activeClassName="active"
									to="/home"
								>
									<li className="dash_sidebar-item active">
										<RssFeed className="dash_sidebar-icons" />
										Acceuil
									</li>
								</NavLink>

								<NavLink activeClassName="active" to="">
									<li className="dash_sidebar-item">
										<Face className="dash_sidebar-icons" />
										Profil
									</li>
								</NavLink>

								<NavLink
									exact={true}
									activeClassName="active"
									to="/"
								>
									<li className="dash_sidebar-item">
										<Help className="dash_sidebar-icons" />
										FAQ
									</li>
								</NavLink>
								<NavLink
									exact={true}
									activeClassName="active"
									to="/"
								>
									<li className="dash_sidebar-item">
										<BugReport className="dash_sidebar-icons" />
										Assistance
									</li>
								</NavLink>
								<NavLink
									exact={true}
									activeClassName="active"
									to="/"
								>
									<li className="dash_sidebar-item">
										<PowerSettingsNew className="dash_sidebar-icons" />
										Logout
									</li>
								</NavLink>
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default DashSidebar;
