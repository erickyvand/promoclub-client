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
	Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReadMore from '../layouts/ReadMore';
import {
	viewOwnPostsAction,
	allCommentsAction,
	viewPostsAction,
} from '../../redux/actions/postAction';
import useStyles from '../../styles/postStyle';
import Comment from './Comment';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import LikePost from './LikePost';
import UnlikePost from './UnlikePost';
import CreatePost from './CreatePost';

const OwnPosts = ({ userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const ownPosts = useSelector(state => state.ownPosts);
	const viewPosts = useSelector(state => state.viewPosts);
	const updatedMessage = useSelector(state => state.editPost.data.updatedAt);
	const allComments = useSelector(state => state.allComments);
	const comments = [...allComments.data];

	const [page] = useState(1);
	const [limit, setLimit] = useState(5);
	const [visible, setVisible] = useState(false);
	const [postId, setPostId] = useState('');
	const [length, setLength] = useState(10);

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

	const handleComment = id => {
		setPostId(id);
		setVisible(!visible);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(viewOwnPostsAction(userId, page, limit));
			setLength(prevLength => prevLength + 10);
			dispatch(viewPostsAction(1, length));
			dispatch(allCommentsAction());
		}, 3000);
		return () => clearInterval(interval);
	}, [limit, userId, updatedMessage]);
	return (
		<div>
			{sessionStorage.getItem('id') === userId && (
				<div style={{ marginBottom: 30 }}>
					<CreatePost />
				</div>
			)}
			<Divider />
			{ownPosts.data.length === 0 ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : ownPosts.data.rows.length === 0 ? (
				<span className={classes.noPostMessage}>
					You have not created any post yet
				</span>
			) : (
				ownPosts.data.rows.map(post => {
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
							<CardActions disableSpacing>
								<LikePost postId={post.id} />
								<UnlikePost postId={post.id} />
								<IconButton
									aria-label='comment'
									onClick={() => handleComment(post.id)}
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
								<DeletePost postId={post.id} userId={post.userId} />
							</CardActions>
							<CardActions>
								{visible && post.id === postId ? (
									<Comment postId={postId} />
								) : (
									''
								)}
							</CardActions>
						</Card>
					);
				})
			)}
			{postLength !== limit && ownPosts.loading ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : (
				''
			)}
		</div>
	);
};

export default OwnPosts;
