import React, { useEffect } from 'react';
import {
	Grid,
	Card,
	CardHeader,
	Avatar,
	CardContent,
	Typography,
	CardActions,
	Tooltip,
	IconButton,
	Divider,
} from '@material-ui/core';
import moment from 'moment';
import CommentIcon from '@material-ui/icons/Comment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import ReadMore from '../layouts/ReadMore';
import LikePost from './LikePost';
import UnlikePost from './UnlikePost';
import DeletePost from './DeletePost';
import Comment from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import {
	singlePostAction,
	allCommentsAction,
} from '../../redux/actions/postAction';
import useStyles from '../../styles/postStyle';
import SidePofile from './SidePofile';
import SideFooter from '../layouts/SideFooter';

const Post = props => {
	const postId = props.match.params.postId;
	const classes = useStyles();
	const dispatch = useDispatch();

	const post = useSelector(state => state.singlePost);
	const editPostMessage = useSelector(state => state.editPost.data.updatedAt);
	const allComments = useSelector(state => state.allComments);
	const comments = [...allComments.data];

	const commentCount = comments.filter(c => c.postId === parseInt(postId));

	useEffect(() => {
		document.title = 'Promoclub | Post';
		dispatch(singlePostAction(postId));
		dispatch(allCommentsAction());
	}, [editPostMessage]);
	return (
		<div>
			<Grid container direction='row' spacing={1}>
				<Grid item md={3}>
					<SidePofile />
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					{Object.keys(post.data).length > 0 && (
						<Card style={{ marginBottom: 10 }}>
							<Link to='/feed' style={{ textDecoration: 'none' }}>
								<IconButton>
									<ArrowBackIcon /> Back to feed
								</IconButton>
							</Link>
							<Divider />
							<CardHeader
								avatar={
									<Link
										to={`/${post.data.User.firstName}${post.data.User.lastName}${post.data.User.id}`.toLowerCase()}
									>
										<Avatar src={post.data.User.profilePicture}>
											{post.data.User.firstName.charAt(0)}
										</Avatar>
									</Link>
								}
								action={
									<EditPost postId={post.data.id} userId={post.data.userId} />
								}
								title={
									<Link
										to={`/${post.data.User.firstName}${post.data.User.lastName}${post.data.User.id}`.toLowerCase()}
										className={classes.nameTitle}
									>{`${post.data.User.firstName} ${post.data.User.lastName}`}</Link>
								}
								subheader={moment(post.data.createdAt).calendar({
									sameDay: `[${moment(post.data.createdAt).fromNow()}]`,
									sameElse: `[${moment(post.data.createdAt).format(
										'Do MMMM YYYY'
									)}]`,
								})}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant='subtitle2'>
									{post.data.post === 'undefined' ? (
										''
									) : (
										<ReadMore text={post.data.post} maxShowCharacter={200} />
									)}
								</Typography>
								{post.data.fileType === 'image/jpg' ||
								post.data.fileType === 'image/jpeg' ||
								post.data.fileType === 'image/png' ||
								post.data.fileType === 'image/gif' ? (
									<img
										src={`${process.env.API_URL}/${post.data.mediaFile}`}
										alt=''
										className={classes.imagePost}
									/>
								) : post.data.fileType === 'video/mp4' ||
								  post.data.fileType === 'video/x-m4v' ? (
									<video
										src={`${process.env.API_URL}/${post.data.mediaFile}`}
										controls
										className={classes.videoPost}
									/>
								) : (
									''
								)}
							</CardContent>
							<CardActions disableSpacing>
								<LikePost postId={post.data.id} />
								<UnlikePost postId={post.data.id} />
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
								<Comment postId={postId} />
							</CardActions>
						</Card>
					)}
				</Grid>
				<Grid item xs={12} sm={12} md={3}>
					<SideFooter />
				</Grid>
			</Grid>
		</div>
	);
};

export default Post;
