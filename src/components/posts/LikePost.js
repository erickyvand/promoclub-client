import React, { useEffect } from 'react';
import { Tooltip, IconButton, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';
import {
	likePostAction,
	countLikeAction,
} from '../../redux/actions/postAction';

const LikePost = ({ postId }) => {
	const dispatch = useDispatch();

	const likedPostMessage = useSelector(state => state.likePost);
	const countLike = useSelector(state => state.countLike);
	const data = [...countLike.data];

	const likes = data.filter(c => c.postId === postId);
	const like = likes.find(
		l => l.userId === parseInt(sessionStorage.getItem('id'))
	);

	const handleClickLike = () => {
		dispatch(likePostAction(postId));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(countLikeAction());
		}, 1000);
		return () => clearInterval(interval);
	}, [likedPostMessage]);
	return (
		<div>
			<Tooltip title='Like' placement='bottom'>
				<IconButton aria-label='like' onClick={handleClickLike}>
					{like !== undefined &&
					parseInt(sessionStorage.getItem('id')) === like.userId ? (
						<ThumbUpIcon style={{ color: '#126eb0' }} />
					) : (
						<ThumbUpIcon />
					)}{' '}
					&nbsp;
					<Typography variant='body2' color='textSecondary' component='p'>
						{like !== undefined &&
						parseInt(sessionStorage.getItem('id')) === like.userId ? (
							<span style={{ color: '#126eb0' }}>{likes.length}</span>
						) : likes.length > 0 ? (
							likes.length
						) : (
							''
						)}
					</Typography>
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default LikePost;
