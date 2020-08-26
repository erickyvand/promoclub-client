import React, { useState } from 'react';
import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction } from '../../redux/actions/postAction';
import useStyles from '../../styles/postStyle';

const DeletePost = ({ postId, userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const deletedPost = useSelector(state => state.deletePost);

	const [open, setOpen] = useState(false);
	const [id, setId] = useState();
	const [unlock, setUnlock] = useState();
	const [message, setMessage] = useState();

	const handleOpenDialog = () => {
		setOpen(true);
		setId(postId);
		setUnlock(!unlock);
		setMessage();
	};

	const handleClose = () => {
		setOpen(false);
		setUnlock(!unlock);
	};

	const handleDelete = () => {
		dispatch(deletePostAction(id));
		setMessage('Post has been deleted');
		setOpen(false);
	};

	return (
		<div>
			{parseInt(sessionStorage.getItem('id')) === userId && (
				<Tooltip title='Delete Post'>
					<IconButton
						onClick={() => handleOpenDialog(postId)}
						className={classes.deletePost}
					>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
			{message && (
				<Snackbar open={unlock} autoHideDuration={6000}>
					<Alert onClose={handleClose} severity='success'>
						{message}
					</Alert>
				</Snackbar>
			)}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
				<DialogActions>
					<Button variant='contained' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='contained' onClick={handleDelete} color='secondary'>
						{deletedPost.loading ? 'Loading...' : 'Delete'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeletePost;
