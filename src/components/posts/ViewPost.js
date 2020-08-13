import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
	Card,
	CardHeader,
	Avatar,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/postStyle';
import { viewPostsAction } from '../../redux/actions/postAction';
import ReadMore from '../layouts/ReadMore';

const ViewPost = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [page] = useState(1);
	const [limit, setLimit] = useState(10);

	const viewPosts = useSelector(state => state.viewPosts);
	const message = useSelector(state => state.viewPostsmessage);
	const postMessage = useSelector(state => state.postReducer.message);

	let postLength;
	if (viewPosts.data.rows !== undefined) {
		postLength = viewPosts.data.rows.length;
	}

	// infinite scroll
	const observer = useRef();
	const lastElement = useCallback(node => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && postLength === limit) {
				setLimit(prevLimit => prevLimit + 15);
			}
		});
		if (node) observer.current.observe(node);
	});

	useEffect(() => {
		dispatch(viewPostsAction(page, limit));
	}, [message, postMessage, limit]);

	return (
		<div style={{ marginTop: 35 }}>
			{viewPosts.data.length === 0
				? [...new Array(5)].map((value, index) => (
						<Card key={index} style={{ marginBottom: 10 }}>
							<CardHeader
								avatar={
									<Avatar>
										<Skeleton
											animation='wave'
											variant='circle'
											width={50}
											height={50}
										/>
									</Avatar>
								}
								action={
									<IconButton aria-label='settings'>
										<Skeleton
											animation='wave'
											variant='circle'
											width={50}
											height={50}
										/>
									</IconButton>
								}
								title={<Skeleton animation='wave' variant='text' width='80%' />}
								subheader={
									<Skeleton animation='wave' variant='text' width='50%' />
								}
							/>
							<CardContent>
								<Typography variant='subtitle2' component='p'>
									{<Skeleton animation='wave' variant='text' width='100%' />}
									{<Skeleton animation='wave' variant='text' width='100%' />}
									{<Skeleton animation='wave' variant='text' width='100%' />}
								</Typography>
							</CardContent>
							<CardContent>
								<Skeleton
									animation='wave'
									variant='rect'
									width='100%'
									height={150}
								/>
							</CardContent>
							<CardActions disableSpacing>
								<IconButton aria-label='like'>
									<Skeleton
										animation='wave'
										variant='circle'
										width={50}
										height={50}
									/>
								</IconButton>
								<IconButton aria-label='dislike'>
									<Skeleton
										animation='wave'
										variant='circle'
										width={50}
										height={50}
									/>
								</IconButton>
								<IconButton aria-label='comment'>
									<Skeleton
										animation='wave'
										variant='circle'
										width={50}
										height={50}
									/>
								</IconButton>
							</CardActions>
						</Card>
				  ))
				: viewPosts.data.rows === 0
				? 'No post to show'
				: viewPosts.data.rows.map(post => (
						<Card ref={lastElement} key={post.id} style={{ marginBottom: 10 }}>
							<CardHeader
								avatar={
									<Link
										to={`/${post.User.firstName}${post.User.lastName}${post.User.id}`.toLowerCase()}
									>
										<Avatar
											src={`${process.env.API_URL}/${post.User.profilePicture}`}
										>
											{post.User.firstName.charAt(0)}
										</Avatar>
									</Link>
								}
								action={
									<IconButton aria-label='settings'>
										<MoreVertIcon />
									</IconButton>
								}
								title={
									<Link
										to={`/${post.User.firstName}${post.User.lastName}${post.User.id}`.toLowerCase()}
										className={classes.nameTitle}
									>{`${post.User.firstName} ${post.User.lastName}`}</Link>
								}
								subheader={moment(post.createdAt).calendar({
									sameDay: `[${moment(post.createdAt).fromNow()}]`,
									sameElse: `[${moment(post.createdAt).format(
										'Do MMMM YYYY'
									)}]`,
								})}
							/>
							<CardContent>
								<Typography variant='subtitle2' component='div'>
									{post.post === 'undefined' ? (
										''
									) : (
										<ReadMore text={post.post} maxShowCharacter={200} />
									)}
								</Typography>
							</CardContent>
							{post.fileType === 'image/jpg' ||
							post.fileType === 'image/jpeg' ||
							post.fileType === 'image/png' ||
							post.fileType === 'image/gif' ? (
								<img
									src={`${process.env.API_URL}/${post.mediaFile}`}
									alt=''
									className={classes.imagePost}
								/>
							) : post.fileType === 'video/mp4' ||
							  post.fileType === 'video/x-m4v' ? (
								<video
									src={`${process.env.API_URL}/${post.mediaFile}`}
									controls
									className={classes.videoPost}
								/>
							) : (
								''
							)}
							<CardActions disableSpacing>
								<IconButton aria-label='like'>
									<ThumbUpIcon /> &nbsp;
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										12
									</Typography>
								</IconButton>
								<IconButton aria-label='dislike'>
									<ThumbDownIcon /> &nbsp;
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										1
									</Typography>
								</IconButton>
								<IconButton aria-label='comment'>
									<CommentIcon /> &nbsp;
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										136
									</Typography>
								</IconButton>
							</CardActions>
						</Card>
				  ))}
			{viewPosts.loading && (
				<CircularProgress className={classes.circularProgress} />
			)}
		</div>
	);
};

export default ViewPost;
