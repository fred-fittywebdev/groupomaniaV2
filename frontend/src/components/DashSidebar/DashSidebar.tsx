import {
	Adb,
	Add,
	BugReport,
	CardMembership,
	Create,
	EmojiEmotions,
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashSidebar.css';
import jwt_decode from 'jwt-decode';

function DashSidebar() {
	const [userRole, setUserRole] = useState('');

	useEffect(() => {
		// const userRole = JSON.parse(localStorage.getItem('role') || '');
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);

		if (decoded) {
			setUserRole(decoded.role);
		}
	}, []);

	const [user, setUser] = useState([]);
	const [userPicture, setUserPicture] = useState('');

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (user) {
			setUser(decoded.user.first_name);
			setUserPicture(decoded.user.profile_picture);
			console.log(userPicture);
		}
	}, []);

	const logout = async () => {
		localStorage.clear();
		window.location.href = '/';
	};

	return (
		<>
			<div className="dash_sidebar">
				<div className="dash_sidebar-wrapper">
					{(userRole === 'Admin' || userRole === 'Moderateur') && (
						<div className="dash_sidebar-menu">
							<h3 className="dash_sidebar-title">Connecté</h3>
							<div className="dash_sidebar_user_wrapper">
								<span className="dash_sidebar-username">
									<Face className="dash_sidebar-icons" />
									{user}: {userRole}
								</span>
								<img
									className="user_profile_picture"
									src={userPicture}
									alt="utilisateur"
								/>
							</div>
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
								<li
									onClick={logout}
									className="dash_sidebar-item"
								>
									<PowerSettingsNew className="dash_sidebar-icons" />
									Logout
								</li>
							</ul>
						</div>
					)}
					{userRole !== 'Admin' && userRole !== 'Moderateur' && (
						<div className="dash_sidebar-menu">
							<h3 className="dash_sidebar-title">Connecté</h3>
							<div className="dash_sidebar_user_wrapper">
								<span className="dash_sidebar-username">
									Bienvenue {user}
								</span>
								<img
									className="user_profile_picture"
									src={userPicture}
									alt="utilisateur"
								/>
							</div>
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

								<NavLink activeClassName="active" to="/profil">
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
									<li
										onClick={logout}
										className="dash_sidebar-item"
									>
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
