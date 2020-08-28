import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, IconButton, Typography, Paper, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import EventIcon from '@material-ui/icons/Event';
import ViewPost from './ViewPost';
import { profileAction } from '../../redux/actions/userAction';
import SideFooter from '../layouts/SideFooter';
import CreatePost from './CreatePost';
import CreateSidePost from './CreateSidePost';

const Feed = () => {
	if (!sessionStorage.getItem('token') || !sessionStorage.getItem('id')) {
		return <Redirect to='/' />;
	}

	const dispatch = useDispatch();

	const profile = useSelector(state => state.profile);
	const viewPosts = useSelector(state => state.viewPosts);
	const message = useSelector(state => state.postReducer.data.id);

	let posts;
	if (viewPosts.data !== 0 && viewPosts.data.rows !== undefined) {
		posts = viewPosts.data.rows.filter(
			p => p.userId === parseInt(sessionStorage.getItem('id'))
		);
	}

	useEffect(() => {
		dispatch(profileAction(sessionStorage.getItem('id')));
	}, [message]);

	return (
		<div>
			<Grid container direction='row' spacing={1}>
				<Grid item md={3}>
					<div className='side-profile'>
						<Paper elevation={6}>
							<Grid
								container
								direction='column'
								alignItems='center'
								style={{ padding: 15 }}
							>
								<Grid item>
									<Avatar
										src={`${process.env.API_URL}/${profile.data.profilePicture}`}
										style={{
											width: 100,
											height: 100,
											border: '1px solid lightgray',
										}}
									></Avatar>
								</Grid>
								<Grid item>
									<Typography>{posts && posts.length} posts</Typography>
								</Grid>
								<Grid item>
									<IconButton>
										<EventIcon />
										<Typography>
											Joined{' '}
											{moment(profile.data.createdAt).format('MMMM Do YYYY')}
										</Typography>
									</IconButton>
								</Grid>
								<Grid item>
									<CreateSidePost />
								</Grid>
							</Grid>
						</Paper>
					</div>
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
