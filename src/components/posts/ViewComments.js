import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Grid, Avatar, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useStyles from '../../styles/postStyle';
import { viewCommentAction } from '../../redux/actions/postAction';
import { Link } from 'react-router-dom';
import ReadMore from '../layouts/ReadMore';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

const ViewComments = ({ postId, commentMessage }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [page] = useState(1);
	const [limit, setLimit] = useState(5);

	const viewComments = useSelector(state => state.viewComments);
	const editCommentMessage = useSelector(
		state => state.editComment.data.updatedAt
	);
	const deletedCommentMessage = useSelector(state => state.deleteComment.data);

	let postLength;
	if (viewComments.data.rows !== undefined) {
		postLength = viewComments.data.rows.length;
	}

	// infinite scroll
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
		dispatch(viewCommentAction(postId, page, limit));
	}, [commentMessage, limit, editCommentMessage, deletedCommentMessage]);

	return (
		<div>
			{viewComments.data.length === 0 ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : viewComments.data.rows.length === 0 ? (
				''
			) : (
				viewComments.data.rows.map(comment => (
					<Grid
						ref={lastElement}
						key={comment.id}
						container
						direction='row'
						spacing={1}
					>
						<Grid item xs={2} sm={1} md={1}>
							<Link
								to={`/${comment.User.firstName}${comment.User.lastName}${comment.User.id}`.toLowerCase()}
							>
								<Avatar
									src={`${process.env.API_URL}/${comment.User.profilePicture}`}
								></Avatar>
							</Link>
						</Grid>
						<Grid item xs={10} sm={11} md={11}>
							<Typography
								variant='subtitle2'
								component='div'
								style={{
									backgroundColor: '#f0f1f2',
									padding: 10,
									borderRadius: 20,
									overflow: 'hidden',
								}}
							>
								<Link
									to={`/${comment.User.firstName}${comment.User.lastName}${comment.User.id}`.toLowerCase()}
									className={classes.nameTitle}
								>
									{comment.User.firstName} {comment.User.lastName}
								</Link>{' '}
								<Typography style={{ fontSize: '0.8em', color: 'gray' }}>
									{moment(comment.createdAt).calendar({
										sameDay: `[${moment(comment.createdAt).fromNow()}]`,
										sameElse: `[${moment(comment.createdAt).format(
											'Do MMMM YYYY'
										)}]`,
									})}
								</Typography>
								{comment.comment === 'undefined' ? (
									''
								) : (
									<ReadMore text={comment.comment} maxShowCharacter={200} />
								)}
							</Typography>
							<Grid container direction='row' spacing={1}>
								<Grid item>
									<EditComment
										commentId={comment.id}
										postId={postId}
										userId={comment.userId}
									/>
								</Grid>
								<Grid item>
									<DeleteComment
										commentId={comment.id}
										postId={postId}
										userId={comment.userId}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				))
			)}
			{viewComments.loading ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : (
				''
			)}
		</div>
	);
};

export default ViewComments;
