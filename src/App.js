import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './style.css';
import Navigation from './components/layouts/Navigation';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Landing from './components/layouts/Landing';
import PageNotFound from './components/layouts/PageNotFound';
import store from './redux/store';

const App = () => {
	return (
		<Router>
			<Provider store={store}>
				<Navigation />
				<div className='container'>
					<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/login' exact component={Login} />
						<Route exact component={PageNotFound} />
					</Switch>
				</div>
			</Provider>
		</Router>
	);
};

export default App;
