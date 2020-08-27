import React, { useEffect } from 'react';
import { Tooltip, IconButton, Typography } from '@material-ui/core';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {
	unlikePostAction,
	countUnlikeAction,
} from '../../redux/actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const UnlikePost = ({ postId }) => {
	const dispatch = useDispatch();

	const countedUnlike = useSelector(state => state.countUnlike);
	const data = [...countedUnlike.data];

	const unlikes = data.filter(c => c.postId === postId);
	const unlike = unlikes.find(
		u => u.userId === parseInt(sessionStorage.getItem('id'))
	);

	const handleClickUnlike = () => {
		dispatch(unlikePostAction(postId));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(countUnlikeAction());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<Tooltip title='Dislike' placement='bottom'>
				<IconButton aria-label='dislike' onClick={handleClickUnlike}>
					{unlike !== undefined &&
					parseInt(sessionStorage.getItem('id')) === unlike.userId ? (
						<ThumbDownIcon style={{ color: '#912b0c' }} />
					) : (
						<ThumbDownIcon />
					)}{' '}
					&nbsp;
					<Typography variant='body2' color='textSecondary' component='p'>
						{unlike !== undefined &&
						parseInt(sessionStorage.getItem('id')) === unlike.userId ? (
							<span style={{ color: '#912b0c' }}>{unlikes.length}</span>
						) : unlikes.length > 0 ? (
							unlikes.length
						) : (
							''
						)}
					</Typography>
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default UnlikePost;
