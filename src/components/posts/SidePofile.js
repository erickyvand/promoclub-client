import React, { useEffect } from 'react';
import moment from 'moment';
import EventIcon from '@material-ui/icons/Event';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, IconButton, Typography, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CreateSidePost from './CreateSidePost';
import { profileAction } from '../../redux/actions/userAction';
import { countOwnPostsAction } from '../../redux/actions/postAction';

const SidePofile = () => {
	const dispatch = useDispatch();

	const profile = useSelector(state => state.profile);
	const countOwnPosts = useSelector(state => state.countOwnPosts);
	const deletedPostMessage = useSelector(state => state.deletePost.message);

	useEffect(() => {
		document.title = `(${sessionStorage.getItem('count')}) Promoclub | Feed`;
		dispatch(profileAction(sessionStorage.getItem('id')));
		dispatch(countOwnPostsAction(sessionStorage.getItem('id')));
	}, [sessionStorage.getItem('count'), deletedPostMessage]);

	return (
		<div className='side-profile'>
			<Paper elevation={6}>
				<Grid
					container
					direction='column'
					alignItems='center'
					style={{ padding: 15 }}
				>
					<Grid item>
						{profile.loading ? (
							<Skeleton
								animation='wave'
								variant='circle'
								width={100}
								height={100}
							/>
						) : (
							<Avatar
								src={profile.data.profilePicture}
								style={{
									width: 100,
									height: 100,
									border: '1px solid lightgray',
								}}
							></Avatar>
						)}
					</Grid>
					<Grid item>
						{countOwnPosts.loading ? (
							<Skeleton animation='wave' width={60} />
						) : (
							<Typography>{countOwnPosts.data.length} posts</Typography>
						)}
					</Grid>
					<Grid item>
						{profile.loading ? (
							<Skeleton animation='wave' width={150} />
						) : (
							<IconButton>
								<EventIcon />
								<Typography>
									Joined {moment(profile.data.createdAt).format('MMMM Do YYYY')}
								</Typography>
							</IconButton>
						)}
					</Grid>
					<Grid item>
						<CreateSidePost />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default SidePofile;
