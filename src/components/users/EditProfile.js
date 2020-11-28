import React, { useState } from 'react';
import {
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	Typography,
	Avatar,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from '../../styles/user';
import { editProfileAction } from '../../redux/actions/userAction';
import { useEffect } from 'react';

const validateFile = (file, setError) => {
	if (
		file.type !== 'image/jpg' &&
		file.type !== 'image/jpeg' &&
		file.type !== 'image/png'
	) {
		setError('Only .jpg, .jpeg, .png file extensions are allowed');
	} else if (file.size > 50000000) {
		setError('Files size must not exceed 50MB');
	} else {
		setError('');
	}
};

const EditProfile = ({ userId, profile }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const editProfile = useSelector(state => state.editProfile);

	const [open, setOpen] = useState(false);
	const [error, setError] = useState();
	const [file, setFile] = useState();
	const [profilePicture, setProfilePicture] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [dateOfBirth, setDateOfBirth] = useState();
	const [address, setAddress] = useState('');
	const [oldPath, setOldPath] = useState();
	const [newPath, setNewPath] = useState(
		`/${sessionStorage.getItem('firstName')}${sessionStorage.getItem(
			'lastName'
		)}${sessionStorage.getItem('id')}/profile/edit/${userId}`
	);

	const handleEdit = () => {
		setOldPath(location.pathname);
		setNewPath(newPath);
		setFirstName(profile.data.firstName);
		setLastName(profile.data.lastName);
		setDateOfBirth(moment(profile.data.dateOfBirth).format('YYYY-MM-D'));
		setAddress(profile.data.address);
		setProfilePicture(profile.data.profilePicture);
		window.history.pushState(null, null, newPath.toLowerCase());
		setOpen(true);
	};

	const handleClose = () => {
		window.history.pushState(null, null, oldPath);
		setOpen(false);
	};

	const previewImage = event => {
		setProfilePicture(event.target.files[0]);
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setFile(reader.result);
			validateFile(file, setError);
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const handleChangeFirstName = event => {
		setFirstName(event.target.value);
	};

	const handleChangeLastName = event => {
		setLastName(event.target.value);
	};

	const handleChangeDate = event => {
		setDateOfBirth(event.target.value);
	};

	const handleChangeAddress = event => {
		setAddress(event.target.value);
	};

	const handleClick = event => {
		event.preventDefault();

		const formData = new FormData();

		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('dateOfBirth', dateOfBirth);
		formData.append('address', address);
		formData.append('profilePicture', profilePicture);

		if (!profilePicture) {
			setError('No Picture has been selected');
		} else if (firstName === undefined) {
			setError('First Name should not be undefined');
		} else if (firstName.length < 2) {
			setError('First Name length must be atleast 2 characters long');
		} else if (lastName === undefined) {
			setError('Last Name should not be undefined');
		} else if (lastName.length < 2) {
			setError('Last Name length must be atleast 2 characters long');
		} else if (!dateOfBirth) {
			setError('Date can not be empty');
		} else if (!address || address === undefined) {
			setError('Address can not be empty');
		} else if (address.length < 2) {
			setError('Address length must be atleast 2 characters long');
		} else {
			dispatch(editProfileAction(userId, formData));
			setError('');
			handleClose();
		}
	};

	useEffect(() => {
		if (location.pathname === newPath.toLowerCase()) {
			handleEdit();
		}
	}, []);

	return (
		<div>
			{sessionStorage.getItem('id') === userId && (
				<IconButton
					size='small'
					onClick={handleEdit}
					style={{ float: 'right', color: '#126eb0' }}
				>
					<EditIcon /> Edit Profile
				</IconButton>
			)}
			<Dialog open={open} fullWidth onClose={handleClose}>
				<DialogTitle>
					<Typography component='span'>Edit your profile</Typography>
					<IconButton onClick={handleClose} style={{ float: 'right' }}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<div className={classes.form}>
					<DialogContent>
						<Avatar
							variant='circle'
							src={file ? file : profile.data.profilePicture}
							className={classes.avatarEditProfile}
						></Avatar>
						{error && <Alert severity='error'>{error}</Alert>}
						<input
							accept='image/*'
							className={classes.input}
							id='profilePicture'
							name='profilePicture'
							type='file'
							onChange={previewImage}
						/>
						<label htmlFor='profilePicture'>
							<IconButton
								color='primary'
								aria-label='upload picture'
								component='span'
								title='Upload'
								className={classes.camera}
							>
								<AddAPhotoIcon />
							</IconButton>
						</label>
						<TextField
							variant='standard'
							margin='normal'
							fullWidth
							size='small'
							id='firstName'
							label='First Name'
							name='firstName'
							type='text'
							onChange={handleChangeFirstName}
							defaultValue={firstName}
						/>
						<TextField
							variant='standard'
							margin='normal'
							fullWidth
							size='small'
							id='lastName'
							label='Last Name'
							name='lastName'
							type='text'
							onChange={handleChangeLastName}
							defaultValue={profile.data.lastName}
						/>
						<TextField
							id='dateOfBirth'
							name='dateOfBirth'
							label='Date of Birth'
							margin='normal'
							type='date'
							onChange={handleChangeDate}
							defaultValue={
								dateOfBirth === null
									? '2020-04-05'
									: moment(dateOfBirth).format('YYYY-MM-D')
							}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							variant='standard'
							margin='normal'
							fullWidth
							size='small'
							id='address'
							label='Address'
							name='address'
							type='text'
							onChange={handleChangeAddress}
							defaultValue={address === null ? '' : address}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							type='submit'
							variant='contained'
							fullWidth
							disabled={
								!profilePicture &&
								!firstName &&
								!lastName &&
								!dateOfBirth &&
								!address
							}
							onClick={handleClick}
							className={classes.submit}
						>
							{editProfile.loading ? 'Loading...' : 'Save'}
						</Button>
					</DialogActions>
				</div>
			</Dialog>
		</div>
	);
};

export default EditProfile;
