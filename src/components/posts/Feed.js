import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ViewPost from './ViewPost';
import SideFooter from '../layouts/SideFooter';
import CreatePost from './CreatePost';
import SidePofile from './SidePofile';
import { useSelector } from 'react-redux';

const Feed = () => {
	if (!sessionStorage.getItem('token') || !sessionStorage.getItem('id')) {
		return <Redirect to='/' />;
	}

	const message = useSelector(state => state.postReducer.data.id);

	return (
		<div>
			<Grid container direction='row' spacing={1}>
				<Grid item md={3}>
					<SidePofile />
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<CreatePost message={message} />
					<ViewPost postedMessage={message} />
				</Grid>
				<Grid item xs={12} sm={12} md={3}>
					<SideFooter />
				</Grid>
			</Grid>
		</div>
	);
};

export default Feed;
