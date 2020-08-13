import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	Typography,
	CardActions,
	CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReadMore from '../layouts/ReadMore';
import { viewOwnPostsAction } from '../../redux/actions/postAction';
import useStyles from '../../styles/postStyle';

const OwnPosts = ({ userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const ownPosts = useSelector(state => state.ownPosts);

	const [page] = useState(1);
	const [limit, setLimit] = useState(5);

	let postLength;
	if (ownPosts.data.rows !== undefined) {
		postLength = ownPosts.data.rows.length;
	}

	const observer = useRef();
	const lastElement = useCallback(node => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && postLength === limit) {
				setLimit(prevLimit => prevLimit + 5);
			}
		});
		if (node) observer.current.observe(node);
	});

	useEffect(() => {
		dispatch(viewOwnPostsAction(userId, page, limit));
	}, [limit, userId]);
	return (
		<div>
			{ownPosts.data.length === 0 ? (
				<CircularProgress className={classes.circularProgress} />
			) : ownPosts.data.rows.length === 0 ? (
				<span className={classes.noPostMessage}>
					You have not created any post yet
				</span>
			) : (
				ownPosts.data.rows.map(post => (
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
								sameElse: `[${moment(post.createdAt).format('Do MMMM YYYY')}]`,
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
								<Typography variant='body2' color='textSecondary' component='p'>
									12
								</Typography>
							</IconButton>
							<IconButton aria-label='dislike'>
								<ThumbDownIcon /> &nbsp;
								<Typography variant='body2' color='textSecondary' component='p'>
									1
								</Typography>
							</IconButton>
							<IconButton aria-label='comment'>
								<CommentIcon /> &nbsp;
								<Typography variant='body2' color='textSecondary' component='p'>
									136
								</Typography>
							</IconButton>
						</CardActions>
					</Card>
				))
			)}
			{ownPosts.loading && (
				<CircularProgress className={classes.circularProgress} />
			)}
		</div>
	);
};

export default OwnPosts;
