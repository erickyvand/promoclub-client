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
	Tooltip,
} from '@material-ui/core';
import moment from 'moment';
import CommentIcon from '@material-ui/icons/Comment';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/postStyle';
import {
	viewPostsAction,
	allCommentsAction,
	countOwnPostsAction,
} from '../../redux/actions/postAction';
import ReadMore from '../layouts/ReadMore';
import Comment from './Comment';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import LikePost from './LikePost';
import UnlikePost from './UnlikePost';

const ViewPost = ({ postedMessage }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const viewPosts = useSelector(state => state.viewPosts);
	const message = useSelector(state => state.viewPosts.message);
	const postMessage = useSelector(state => state.postReducer.data.createdAt);
	const updatedMessage = useSelector(state => state.editPost.data.updatedAt);
	const allComments = useSelector(state => state.allComments);
	const deletedPostMessage = useSelector(state => state.deletePost.message);
	const comments = [...allComments.data];

	const [page] = useState(1);
	const [limit, setLimit] = useState(10);
	const [visible, setVisible] = useState(false);
	const [postId, setPostId] = useState();

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

	const handleComment = id => {
		setPostId(id);
		setVisible(!visible);
	};

	useEffect(() => {
		dispatch(viewPostsAction(page, limit));
		dispatch(allCommentsAction());
		dispatch(countOwnPostsAction(sessionStorage.getItem('id')));
	}, [
		message,
		postMessage,
		limit,
		updatedMessage,
			postedMessage,
		deletedPostMessage,
		sessionStorage.getItem('id'),
	]);

	return (
		<div style={{ marginTop: 35 }}>
			{viewPosts.data.length === 0 ? (
				[...new Array(5)].map((value, index) => (
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
			) : viewPosts.data.rows.length === 0 ? (
				<span className={classes.noPostMessage}>No post to show</span>
			) : (
				viewPosts.data.rows.map(post => {
					const commentCount = comments.filter(c => c.postId === post.id);
					return (
						<Card ref={lastElement} key={post.id} style={{ marginBottom: 10 }}>
							<CardHeader
								avatar={
									<Link
										to={`/${post.User.firstName}${post.User.lastName}${post.User.id}`.toLowerCase()}
									>
										<Avatar src={post.User.profilePicture}>
											{post.User.firstName.charAt(0)}
										</Avatar>
									</Link>
								}
								action={<EditPost postId={post.id} userId={post.userId} />}
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
							<Link
								to={`/post/${post.id}`}
								style={{ color: '#454647', textDecoration: 'none' }}
							>
								<CardContent className={classes.cardContent}>
									<Typography variant='subtitle2'>
										{post.post === 'undefined' ? (
											''
										) : (
											<ReadMore text={post.post} maxShowCharacter={200} />
										)}
									</Typography>
									{post.fileType === 'image/jpg' ||
									post.fileType === 'image/jpeg' ||
									post.fileType === 'image/png' ||
									post.fileType === 'image/gif' ? (
										<img
											src={post.mediaFile}
											alt=''
											className={classes.imagePost}
										/>
									) : post.fileType === 'video/mp4' ||
									  post.fileType === 'video/x-m4v' ? (
										<video
											src={post.mediaFile}
											controls
											className={classes.videoPost}
										/>
									) : (
										''
									)}
								</CardContent>
							</Link>
							<CardActions disableSpacing>
								<LikePost postId={post.id} />
								<UnlikePost postId={post.id} />
								<Tooltip title='Comment' placement='bottom'>
									<IconButton
										onClick={() => handleComment(post.id)}
										aria-label='comment'
									>
										<CommentIcon /> &nbsp;
										<Typography
											variant='body2'
											color='textSecondary'
											component='p'
										>
											{commentCount.length === 0
												? ''
												: commentCount.length === 1
												? `${commentCount.length} comment`
												: `${commentCount.length} comments`}
										</Typography>
									</IconButton>
								</Tooltip>
								<DeletePost postId={post.id} userId={post.userId} />
							</CardActions>
							<CardActions>
								{visible && postId === post.id ? (
									<Comment postId={postId} />
								) : (
									''
								)}
							</CardActions>
						</Card>
					);
				})
			)}
			{viewPosts.loading ? (
				''
			) : (
				<CircularProgress size={10} className={classes.circularProgress} />
			)}
		</div>
	);
};

export default ViewPost;
