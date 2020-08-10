import React, { useState, useRef, createRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
	Grid,
	TextField,
	IconButton,
	Button,
	Popper,
	ClickAwayListener,
	MenuList,
	Typography,
	Collapse,
	Card,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import useStyles from '../../styles/postStyle';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../redux/actions/postAction';
import ViewPost from './ViewPost';

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

const Post = () => {
	if (!sessionStorage.getItem('token') || !sessionStorage.getItem('id')) {
		return <Redirect to='/' />;
	}

	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const postReducer = useSelector(state => state.postReducer);
	const message = useSelector(state => state.postReducer.message);

	const [file, setFile] = useState();
	const [preview, setPreview] = useState();
	const [mediaFile, setMediaFile] = useState();
	const [open, setOpen] = useState(false);
	const [unlock, setUnlock] = useState(true);
	const [post, setPost] = useState();
	const [error, setError] = useState();
	const [icon, setIcon] = useState();
	const anchorRef = useRef(null);
	const fileInput = createRef();

	const previewImage = event => {
		setMediaFile(event.target.files[0]);
		setIcon(<CloseIcon />);
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setFile(reader.result);
			setPreview(reader.result.charAt(5));
			validateFile(file, setError);
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const closeErrMsg = () => {
		setUnlock(false);
	};

	const closePreviewFile = () => {
		setFile();
		setIcon();
	};

	const handleChange = e => {
		setPost(e.target.value);
	};

	const addEmoji = e => {
		if (post === undefined) {
			setPost(e.native);
		} else {
			setPost(post + e.native);
		}
	};

	const handleClick = e => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('post', post);
		formData.append('mediaFile', mediaFile);

		dispatch(postAction(formData));

		setPost();
		setFile('');
		setIcon();

		history.push('/feed');
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open, message]);

	return (
		<div className={classes.root}>
			<Grid container direction='row' spacing={1}>
				<Grid item xs={12} sm={12} md={3}>
					profile
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Card>
						<Collapse in={unlock}>
							{postReducer.error && (
								<Alert severity='error' onClose={closeErrMsg}>
									{postReducer.error && postReducer.error}
								</Alert>
							)}
						</Collapse>
						<div className={classes.form}>
							<TextField
								id='post'
								name='post'
								label='Create Post'
								placeholder={`What do you want to share ${sessionStorage.getItem(
									'firstName'
								)}?`}
								rows={4}
								multiline
								fullWidth
								value={post === undefined ? '' : post}
								onChange={handleChange}
							/>
							<div>
								{preview === 'i' ? (
									<Grid
										container
										direction='row'
										justify='flex-start'
										alignItems='flex-start'
									>
										<Grid item xs={6} sm={6} md={6}>
											<img src={file} className={classes.imgPreview} />
										</Grid>
										<Grid item xs={6} sm={6} md={6}>
											<IconButton onClick={closePreviewFile}>{icon}</IconButton>
										</Grid>
									</Grid>
								) : preview === 'v' ? (
									<Grid
										container
										direction='row'
										justify='flex-start'
										alignItems='flex-start'
									>
										<Grid item xs={6} sm={6} md={6}>
											<video
												src={file}
												className={classes.imgPreview}
												controls
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={6}>
											<IconButton onClick={closePreviewFile}>{icon}</IconButton>
										</Grid>
									</Grid>
								) : (
									''
								)}
							</div>
							<Typography color='error'>{error && error}</Typography>
							<Grid container direction='row' justify='center'>
								<Grid item>
									<input
										accept='image/*|video/*'
										className={classes.input}
										id='mediaFile'
										name='mediaFile'
										ref={fileInput}
										type='file'
										onChange={previewImage}
									/>
									<label htmlFor='mediaFile'>
										<IconButton
											color='primary'
											aria-label='upload picture'
											component='span'
											title='Upload'
										>
											<PhotoCamera />
										</IconButton>
									</label>
								</Grid>
								<Grid item>
									<IconButton
										title='Insert an emoji'
										ref={anchorRef}
										onClick={handleToggle}
									>
										<Emoji emoji={{ id: 'smiley', skin: 3 }} size={22} />
									</IconButton>
									<Popper open={open} anchorEl={anchorRef.current}>
										<ClickAwayListener onClickAway={handleClose}>
											<MenuList
												style={{ float: 'right' }}
												autoFocusItem={open}
												id='menu-list-grow'
											>
												<Picker onSelect={addEmoji} />
											</MenuList>
										</ClickAwayListener>
									</Popper>
								</Grid>
							</Grid>
							<Grid container direction='row' justify='flex-end'>
								<Grid item>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										disabled={
											(!post && (!file || error !== '')) || postReducer.loading
										}
										className={classes.submit}
										onClick={handleClick}
									>
										{postReducer.loading ? 'Loading...' : 'Post'}
									</Button>
								</Grid>
							</Grid>
						</div>
					</Card>
					<ViewPost />
				</Grid>
				<Grid item xs={12} sm={12} md={3}>
					footer
				</Grid>
			</Grid>
		</div>
	);
};

export default Post;
