import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import './Login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const { data } = await axios.post('http://localhost:8080/api/login', {
			email,
			password,
		});

		console.log(data);
	};

	return (
		<div>
			<div className="login">
				<div className="login_wrapper">
					<div className="wrapper-left">
						<h3 className="left-logo">Groupomania</h3>
						<p className="left-description">
							Bienvenue sur Groupomania, veuillez lire les
							conditions d'utilisation avant de vous connecter.
							Une fois connecté n'oubliez pasde modifier votre mot
							de passe. Veillez à rester respectueux dans vos
							publications, n'oubliez pas que ce sont vos
							collègues de travail !
						</p>
					</div>
					<div className="wrapper-right">
						<div className="login_box">
							<form onSubmit={submit} className="auth-form">
								<h2 className="login-title">Connectez-vous</h2>
								<label>
									<span>Email:</span>
									<input
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
										type="email"
									/>
								</label>
								<label>
									<span>Password:</span>
									<input
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										type="password"
									/>
								</label>
								<button className="btn">Connexion</button>
							</form>
							<a className="forgot-link" href="#">
								Mot de passe oublié?{' '}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
