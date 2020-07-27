import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/layouts/Navigation';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Landing from './components/layouts/Landing';

const App = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/login' exact component={Login} />
			</Switch>
		</Router>
	);
};

export default App;
