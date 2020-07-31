import React from 'react';
import { Redirect } from 'react-router-dom';

const Feed = () => {
	if (!sessionStorage.getItem('token') || !sessionStorage.getItem('id')) {
		return <Redirect to='login' />;
	}
	return <div>Feed</div>;
};

export default Feed;
