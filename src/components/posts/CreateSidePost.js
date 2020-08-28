import React, { useState, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Card,
	Collapse,
	TextField,
	Typography,
	Grid,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import useStyles from '../../styles/postStyle';
import { postAction } from '../../redux/actions/postAction';

const CreateSidePost = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const postReducer = useSelector(state => state.postReducer);

	const [file, setFile] = useState();
	const [preview, setPreview] = useState();
	const [mediaFile, setMediaFile] = useState();
	const [visible, setVisible] = useState(false);
	const [unlock, setUnlock] = useState(true);
	const [post, setPost] = useState();
	const [error, setError] = useState();
	const [icon, setIcon] = useState();
	const anchorRef = useRef(null);
	const fileInput = createRef();
	const [allow, setAllow] = useState(false);

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

	const handleOpenDialog = () => {
		setAllow(true);
	};

	const handleCloseDialog = () => {
		setAllow(false);
	};

	const handleShowEmojies = () => {
		setVisible(!visible);
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

		setAllow(false);
	};

	return (
		<div>
			<Button variant='contained' color='primary' onClick={handleOpenDialog}>
				Create Post
			</Button>
			<Dialog open={allow} fullWidth onClose={handleCloseDialog}>
				<DialogTitle>Create Post</DialogTitle>
				<DialogContent>
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
								<Grid item md={1}>
									<input
										accept='image/*|video/*'
										className={classes.input}
										id='file'
										name='mediaFile'
										ref={fileInput}
										type='file'
										onChange={previewImage}
									/>
									<label htmlFor='file'>
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
								<Grid item md={5}>
									<Grid container direction='column'>
										<Grid item>
											<IconButton
												title='Insert an emoji'
												ref={anchorRef}
												onClick={handleShowEmojies}
											>
												<Emoji emoji={{ id: 'smiley', skin: 3 }} size={22} />
											</IconButton>
										</Grid>
										<Grid item>
											{visible && <Picker onSelect={addEmoji} />}
										</Grid>
									</Grid>
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
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateSidePost;
