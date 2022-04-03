// styles
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
// import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
	return (
		<div className="App">
			{/* <BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
				</Switch>
			</BrowserRouter> */}
			<Dashboard />
		</div>
	);
}

export default App;
