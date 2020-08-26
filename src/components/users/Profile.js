import React, { useState, useEffect } from 'react';
import {
	Grid,
	Avatar,
	AppBar,
	Tabs,
	Tab,
	Table,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Paper,
	Collapse,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@material-ui/core';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import TabPanel from '../layouts/TabPanel';
import useStyles from '../../styles/user';
import { profileAction } from '../../redux/actions/userAction';
import EditProfile from './EditProfile';
import OwnPosts from '../posts/OwnPosts';
import PostMedia from '../posts/PostMedia';

const a11yProps = index => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const Profile = props => {
	const username = props.match.params.username;
	const userId = username.replace(/[^\d.]/g, '');

	const classes = useStyles();
	const dispatch = useDispatch();

	const profile = useSelector(state => state.profile);
	const successMessage = useSelector(state => state.editProfile.data.updatedAt);
	const errorMessage = useSelector(state => state.editProfile.error);

	const [value, setValue] = useState(0);
	const [open, setOpen] = useState(true);
	const [unlock, setUnlock] = useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenDialog = () => {
		setUnlock(true);
	};

	const handleCloseDialog = () => {
		setUnlock(false);
	};

	useEffect(() => {
		dispatch(profileAction(userId));
	}, [userId, successMessage]);

	return (
		<div>
			<Grid container direction='row'>
				{errorMessage && (
					<Collapse in={open}>
						<Alert severity='error' onClose={handleClose}>
							{errorMessage}
						</Alert>
					</Collapse>
				)}
				<Grid item xs={12} sm={12} md={12}>
					<Avatar
						variant='square'
						src='https://source.unsplash.com/random'
						className={classes.cover}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={8}>
					{profile.loading ? (
						<Avatar>
							<Skeleton
								animation='wave'
								variant='circle'
								className={classes.profileImage}
							/>
						</Avatar>
					) : (
						<Avatar
							variant='circle'
							src={`${process.env.API_URL}/${profile.data.profilePicture}`}
							className={classes.profileImage}
							onClick={handleOpenDialog}
						/>
					)}
				</Grid>
				<Dialog open={unlock} onClose={handleCloseDialog}>
					<DialogTitle>
						{profile.data.firstName} {profile.data.lastName}
					</DialogTitle>
					<DialogContent>
						<Avatar
							variant='rounded'
							src={`${process.env.API_URL}/${profile.data.profilePicture}`}
							style={{ width: 500, height: 500 }}
						/>
					</DialogContent>
				</Dialog>
				<Grid item xs={12} sm={12} md={4}>
					<EditProfile userId={userId} profile={profile} />
				</Grid>
			</Grid>
			<Grid container direction='row' spacing={2}>
				<Grid item xs={12} sm={12} md={4}>
					<TableContainer component={Paper} className={classes.rootTab}>
						{profile.loading ? (
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
										<TableCell>
											<Skeleton animation='wave' variant='text' width='80%' />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						) : (
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>First Name</TableCell>
										<TableCell>{profile.data.firstName}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Last Name</TableCell>
										<TableCell>{profile.data.lastName}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Date of Birth</TableCell>
										<TableCell>
											{profile.data.dateOfBirth === null
												? 'No Information'
												: moment(profile.data.dateOfBirth).format(
														'Do MMM YYYY'
												  )}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Address</TableCell>
										<TableCell>
											{profile.data.address === null
												? 'No Information'
												: profile.data.address}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Joined</TableCell>
										<TableCell>
											{moment(profile.data.createdAt).format(
												'dddd, MMMM Do YYYY'
											)}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						)}
					</TableContainer>
				</Grid>
				<Grid item xs={12} sm={12} md={8}>
					<div className={classes.rootTab}>
						<AppBar position='static' style={{ backgroundColor: '#126eb0' }}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label='simple tabs example'
							>
								<Tab label='Photos/Videos' {...a11yProps(0)} />
								<Tab label='Posts' {...a11yProps(1)} />
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
							<PostMedia userId={userId} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<OwnPosts userId={userId} />
						</TabPanel>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Profile;
