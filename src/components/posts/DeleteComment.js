import React, { useState } from 'react';
import {
	Typography,
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
} from '@material-ui/core';
import useStyles from '../../styles/postStyle';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentAction } from '../../redux/actions/postAction';

const DeleteComment = ({ commentId, postId, userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const deletedComment = useSelector(state => state.deleteComment);

	const [open, setOpen] = useState(false);

	const handleOpenDialog = () => {
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleClickDelete = () => {
		dispatch(deleteCommentAction(postId, commentId));
		setOpen(false);
	};

	return (
		<div>
			{parseInt(sessionStorage.getItem('id')) === userId && (
				<Typography
					className={classes.deleteComment}
					onClick={handleOpenDialog}
				>
					delete
				</Typography>
			)}
			<Dialog open={open} onClose={handleCloseDialog}>
				<DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
				<DialogActions>
					<Button variant='contained' onClick={handleCloseDialog}>
						Cancel
					</Button>
					<Button
						variant='contained'
						onClick={handleClickDelete}
						color='secondary'
					>
						{deletedComment.loading ? 'Loading...' : 'Delete'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteComment;
