import React from 'react';
import './Topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';

const Topbar = () => {
	return (
		<div>
			<div className="topbar-container">
				<div className="left">
					<div>
						<span className="logo">Groupomania</span>
					</div>
				</div>
				<div className="center">
					<div className="searchbar">
						<Search className="searchbar-icon" />
						<input
							className="searchbar-input"
							type="text"
							placeholder="Rechercher"
						/>
					</div>
				</div>
				<div className="right">
					<div className="topbar_links">
						<span className="topbar_link">Admin</span>
					</div>
					<div className="topbar_icons">
						<div className="topbar_icon-item">
							<Person />
							<span className="topbar_icon-badge">1</span>
						</div>
						<div className="topbar_icon-item">
							<Chat />
							<span className="topbar_icon-badge">2</span>
						</div>
						<div className="topbar_icon-item">
							<Notifications />
							<span className="topbar_icon-badge">3</span>
						</div>
					</div>
					<img
						src="/assets/profil1.png"
						alt="profil de l'utilisateur"
						className="topbar-img"
					/>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
