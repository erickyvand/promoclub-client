import React, { useState } from 'react';
import {
	Typography,
	Dialog,
	Slide,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Grid,
	Button,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import useStyles from '../../styles/postStyle';
import { useSelector, useDispatch } from 'react-redux';
import { editCommentAction } from '../../redux/actions/postAction';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const EditComment = ({ commentId, postId, userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const comments = useSelector(state => state.viewComments);
	const editComment = useSelector(state => state.editComment);

	const viewComment = comments.data.rows.find(c => c.id === commentId);

	const [visible, setVisible] = useState(false);
	const [unlock, setUnlock] = useState(false);
	const [comment, setComment] = useState('');

	const openDialog = () => {
		setUnlock(true);
		setComment(viewComment.comment);
	};

	const handleChange = e => {
		setComment(e.target.value);
	};

	const handleCloseDialog = () => {
		setUnlock(false);
	};

	const openEmojiPicker = () => {
		setVisible(!visible);
	};

	const addEmoji = e => {
		setComment(comment + e.native);
	};

	const handleClickEdit = () => {
		const formData = new FormData();
		formData.append('comment', comment);
		dispatch(editCommentAction(postId, commentId, formData));
		setUnlock(false);
	};

	return (
		<div>
			{parseInt(sessionStorage.getItem('id')) === userId && (
				<Typography onClick={openDialog} className={classes.editComment}>
					edit
				</Typography>
			)}
			<Dialog
				open={unlock}
				fullWidth
				TransitionComponent={Transition}
				onClose={handleCloseDialog}
			>
				<DialogTitle>Edit your comment</DialogTitle>
				<DialogContent>
					<TextField
						id='post'
						name='post'
						label='Edit Post'
						placeholder={`Hello ${sessionStorage.getItem(
							'firstName'
						)}, you can edit your post`}
						rows={4}
						multiline
						fullWidth
						autoFocus
						onFocus={e => {
							const temp_value = e.target.value;
							e.target.value = '';
							e.target.value = temp_value;
						}}
						value={comment}
						onChange={handleChange}
					/>
					<Grid container direction='column'>
						<Grid item>
							<Tooltip title='Insert an emoji'>
								<IconButton onClick={openEmojiPicker}>
									<Emoji emoji={{ id: 'smiley', skin: 3 }} size={22} />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>{visible && <Picker onClick={addEmoji} />}</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container direction='row' justify='flex-end'>
						<Grid item>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={!comment || editComment.loading}
								className={classes.submit}
								onClick={handleClickEdit}
							>
								{editComment.loading ? 'Loading...' : 'Save'}
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditComment;
