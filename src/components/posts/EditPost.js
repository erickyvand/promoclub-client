import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	TextField,
	DialogActions,
	Grid,
	Button,
	Avatar,
} from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import useStyles from '../../styles/postStyle';
import { useSelector, useDispatch } from 'react-redux';
import { editPostAction } from '../../redux/actions/postAction';

const validateFile = (file, setError) => {
	if (
		file.type !== 'image/jpg' &&
		file.type !== 'image/jpeg' &&
		file.type !== 'image/png' &&
		file.type !== 'image/gif' &&
		file.type !== 'video/mp4' &&
		file.type !== 'video/x-m4v'
	) {
		setError(
			'Only .jpg, .jpeg, .png, .mp4, .mkv, .gif file extensions are allowed'
		);
	} else if (file.size > 50000000) {
		setError('Files size must not exceed 50MB');
	} else {
		setError('');
	}
};

const EditPost = ({ postId, userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const posts = useSelector(state => state.countOwnPosts);
	const editPost = useSelector(state => state.editPost);
	const editPostMessage = useSelector(state => state.editPost.data.updatedAt);

	const [showIcon, setShowIcon] = useState(false);
	const [unlock, setUnlock] = useState(false);
	const [id, setId] = useState();
	const [oldPath, setOldPath] = useState();
	const [newPath, setNewPath] = useState(`/feed/post/edit/${postId}`);
	const [post, setPost] = useState('');
	const [file, setFile] = useState('');
	const [mediaFile, setMediaFile] = useState();
	const [fileType, setFileType] = useState('');
	const [preview, setPreview] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleMore = () => {
		setShowIcon(showIcon ? false : true);
	};

	const handleEdit = id => {
		let singlePost;
		if (posts.data !== undefined) {
			singlePost = posts.data.find(p => p.id === id);
		}
		if (singlePost !== undefined) {
			setPost(singlePost.post);
			setFile(singlePost.mediaFile);
			setFileType(singlePost.fileType);
		}
		setId(parseInt(id));
		setOldPath(location.pathname);
		setNewPath(newPath);
		window.history.pushState(null, null, newPath);
		setUnlock(true);
	};

	const handleClose = () => {
		setUnlock(false);
		window.history.pushState(null, null, oldPath);
		setShowIcon(false);
	};

	const handleChange = e => {
		setPost(e.target.value);
	};

	const OpenEmojiPicker = () => {
		setOpen(!open);
	};

	const addEmoji = e => {
		setPost(post + e.native);
	};

	const previewImage = event => {
		setMediaFile(event.target.files[0]);
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setFile(reader.result);
			setPreview(reader.result.charAt(5));
			validateFile(file, setError);
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleClick = () => {
		const formData = new FormData();
		formData.append('post', post);
		formData.append('mediaFile', mediaFile);
		dispatch(editPostAction(id, formData));
		window.history.pushState(null, null, oldPath);
		setTimeout(() => {
			setUnlock(false);
		}, 10000);
	};
	useEffect(() => {
		if (location.pathname === newPath) {
			handleEdit(id);
		}
	}, [editPostMessage]);

	return (
		<div>
			{parseInt(sessionStorage.getItem('id')) === userId && showIcon ? (
				<Tooltip title='Edit Post'>
					<IconButton aria-controls='edit' onClick={() => handleEdit(postId)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
			) : parseInt(sessionStorage.getItem('id')) === userId ? (
				<Tooltip title='View More'>
					<IconButton aria-controls='more' onClick={handleMore}>
						<MoreVertIcon />
					</IconButton>
				</Tooltip>
			) : (
				''
			)}
			<Dialog fullWidth open={unlock} onClose={handleClose}>
				<DialogTitle>
					<Typography component='span'>Edit your profile</Typography>
					<IconButton onClick={handleClose} style={{ float: 'right' }}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<div className={classes.form}>
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
							value={post === 'undefined' ? '' : post}
							onChange={handleChange}
						/>
					</DialogContent>
					<DialogContent>
						<Grid container direction='row'>
							<Grid item md={4}>
								{preview === 'v' ? (
									<video
										src={file}
										style={{ width: 190, height: 190 }}
										controls
									/>
								) : preview === 'i' ? (
									<Avatar
										src={file}
										variant='rounded'
										style={{ width: 190, height: 190 }}
									></Avatar>
								) : file === null ? (
									''
								) : fileType === 'video/mp4' || fileType === 'video/x-m4v' ? (
									<video
										src={file}
										style={{ width: 190, height: 190 }}
										controls
									/>
								) : (
									<Avatar
										src={file}
										variant='rounded'
										style={{ width: 190, height: 190 }}
									></Avatar>
								)}
								{error && (
									<Typography color='secondary' variant='body2'>
										{error}
									</Typography>
								)}
							</Grid>
							<Grid item md={1}>
								<input
									accept='image/*|video/*'
									className={classes.input}
									id='file'
									name='mediaFile'
									type='file'
									onChange={previewImage}
								/>
								<label htmlFor='file'>
									<Tooltip title='Add a photo or video'>
										<IconButton
											color='primary'
											aria-label='upload picture'
											component='span'
											className={classes.camera}
										>
											<AddAPhotoIcon />
										</IconButton>
									</Tooltip>
								</label>
							</Grid>
							<Grid item md={7}>
								<Grid container direction='column'>
									<Grid item>
										<Tooltip title='Insert an emoji'>
											<IconButton onClick={OpenEmojiPicker}>
												<InsertEmoticonIcon />
											</IconButton>
										</Tooltip>
									</Grid>
									<Grid item>{open && <Picker onSelect={addEmoji} />}</Grid>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Grid container direction='row' justify='flex-end'>
							<Grid item>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									disabled={
										(!post && (!file || error !== '')) || editPost.loading
									}
									className={classes.submit}
									onClick={handleClick}
								>
									{editPost.loading ? 'Loading...' : 'Save'}
								</Button>
							</Grid>
						</Grid>
					</DialogActions>
				</div>
			</Dialog>
		</div>
	);
};

export default EditPost;
