import React from 'react';
import './Profil.css';

function Profil() {
	return (
		<div className="profileRight">
			<div className="profileRightTop">
				<div className="profileCover">
					<img
						className="profileUserImg"
						src="assets/profil1.png"
						alt=""
					/>
				</div>
				<div className="profileInfo">
					<h4 className="profileInfoName">Safak Kocaoglu</h4>
					<span className="profileInfoDesc">Hello my friends!</span>
				</div>
			</div>
			<form className="auth-form">
				<h2>Enregistrement</h2>
				<label>
					<span>Nom:</span>
					<input
						// onChange={(e) => setLastName(e.target.value)}
						required
						type="text"
					/>
				</label>
				<label>
					<span>Prénom:</span>
					<input
						// onChange={(e) => setFirstName(e.target.value)}
						required
						type="text"
					/>
				</label>
				<label>
					<span>Email:</span>
					<input
						// onChange={(e) => setEmail(e.target.value)}
						required
						type="email"
					/>
				</label>
				<label>
					<span>Mot de passe:</span>
					<input
						// onChange={(e) => setPassword(e.target.value)}
						required
						type="password"
					/>
				</label>
				<label>
					<span>Mot de passe confirmation:</span>
					<input
						// onChange={(e) => setPasswordConfirm(e.target.value)}
						required
						type="password"
					/>
				</label>
				{/* <label>
							<span>Image de profil:</span>
							<input required type="file" />
						</label> */}
				<button className="btn">Envoyer</button>
			</form>
		</div>
	);
}

export default Profil;
