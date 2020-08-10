import React, { useState } from 'react';
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
} from '@material-ui/core';
import moment from 'moment';
import TabPanel from '../layouts/TabPanel';
import useStyles from '../../styles/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileAction } from '../../redux/actions/userAction';
import Skeleton from '@material-ui/lab/Skeleton';

const a11yProps = index => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const Profile = props => {
	const userId = props.match.params.username.charAt(
		props.match.params.username.length - 1
	);
	const classes = useStyles();
	const dispatch = useDispatch();

	const [value, setValue] = useState(0);

	const profile = useSelector(state => state.profile);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		dispatch(profileAction(userId));
	}, []);

	return (
		<div>
			<Grid container direction='column'>
				<Grid item xs={12} sm={12} md={12}>
					<Avatar
						variant='square'
						src='https://source.unsplash.com/random'
						className={classes.cover}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					{profile.loading ? (
						<Avatar>
							<Skeleton
								animation='wave'
								variant='circle'
								width={200}
								height={200}
							/>
						</Avatar>
					) : (
						<Avatar
							variant='circle'
							src={`${process.env.API_URL}/${profile.data.profilePicture}`}
							className={classes.profileImage}
						/>
					)}
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
												: profile.data.dateOfBirth}
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
								<Tab label='My Posts' {...a11yProps(1)} />
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
							Item Two
						</TabPanel>
						<TabPanel value={value} index={1}>
							Item Three
						</TabPanel>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Profile;
