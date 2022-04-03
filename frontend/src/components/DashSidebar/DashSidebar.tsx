import {
	CardMembership,
	Equalizer,
	Group,
	LineStyle,
	MenuBook,
	Warning,
} from '@material-ui/icons';
import React from 'react';
import './DashSidebar.css';

function DashSidebar() {
	return (
		<div className="dash_sidebar">
			<div className="dash_sidebar-wrapper">
				<div className="dash_sidebar-menu">
					<h3 className="dash_sidebar-title">Menu Rapide</h3>
					<ul className="dash_sidebar-list">
						<li className="dash_sidebar-item active">
							<LineStyle className="dash_sidebar-icons" />
							Acceuil
						</li>
						<li className="dash_sidebar-item">
							<Group className="dash_sidebar-icons" />
							Membres
						</li>
						<li className="dash_sidebar-item">
							<MenuBook className="dash_sidebar-icons" />
							Posts
						</li>
					</ul>
				</div>
				<div className="dash_sidebar-menu">
					<h3 className="dash_sidebar-title">Staff</h3>
					<ul className="dash_sidebar-list">
						<li className="dash_sidebar-item">
							<CardMembership className="dash_sidebar-icons" />
							Rôles
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
			</div>
		</div>
	);
}

export default DashSidebar;
