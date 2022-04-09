import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import axios to make some default configuration
import axios from 'axios';

//baseurl
axios.defaults.baseURL = 'http://localhost:8080/api/';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
