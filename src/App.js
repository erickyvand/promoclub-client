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
import Oauth from './components/auth/Oauth';
import SearchAccount from './components/auth/SearchAccount';
import ResetPassword from './components/auth/ResetPassword';
import Feed from './components/posts/Feed';
import Profile from './components/users/Profile';
import Footer from './components/layouts/Footer';
import EditPost from './components/posts/EditPost';
import Post from './components/posts/Post';

const App = () => {
	return (
		<Router>
			<Provider store={store}>
				<Navigation />
				<div className='container App'>
					<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/login' exact component={Login} />
						<Route path='/oauth' exact component={Oauth} />
						<Route path='/feed' exact component={Feed} />
						<Route path='/search-account' exact component={SearchAccount} />
						<Route path='/reset-password' exact component={ResetPassword} />
						<Route path='/:username' exact component={Profile} />
						<Route
							path='/:username/profile/edit/:userId'
							exact
							component={Profile}
						/>
						<Route path='/feed/post/edit/:postId' exact component={EditPost} />
						<Route path='/post/:postId' exact component={Post} />
						<Route exact component={PageNotFound} />
					</Switch>
				</div>
				<Footer />
			</Provider>
		</Router>
	);
};

export default App;
