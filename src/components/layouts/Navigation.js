import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Badge,
	MenuItem,
	Menu,
	Container,
	Avatar,
	Popper,
	Paper,
	Divider,
	Grid,
	CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from 'react-autocomplete';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MoreIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import useStyles from '../../styles/Layouts';
import { useDispatch, useSelector } from 'react-redux';
import {
	getNotificationAction,
	countNotificationsAction,
	readNotificationAction,
	markAllAsReadAction,
} from '../../redux/actions/NotificationAction';
import { getUsersAction } from '../../redux/actions/userAction';
import { searchAction } from '../../redux/actions/searchAction';

const Navigation = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const notifications = useSelector(state => state.notifications);
	const usersReducer = useSelector(state => state.users);
	const users = [...usersReducer.data];
	const countNotifications = useSelector(state => state.countNotifications);
	const counts = [...countNotifications.data];
	const messageCount = useSelector(state => state.countNotifications.message);
	const readNotification = useSelector(
		state => state.readNotification.data.updatedAt
	);
	const markAll = useSelector(state => state.markAll);
	const search = useSelector(state => state.search);

	let totalNotifications;
	if (counts.length > 0) {
		totalNotifications = counts.filter(
			c => c.recipientId === parseInt(sessionStorage.getItem('id'))
		);
		sessionStorage.setItem('count', totalNotifications.length);
	}

	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [anchor, setAnchor] = useState(null);
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState();
	const [page] = useState(1);
	const [limit, setLimit] = useState(10);
	const [display, setDisplay] = useState(false);
	const [value, setValue] = useState('');

	let NotificationLength;
	if (notifications.data.rows !== undefined) {
		NotificationLength = notifications.data.rows.length;
	}

	let searchLength;
	if (search.data.rows !== undefined) {
		searchLength = search.data.rows.length;
	}

	const observer = useRef();
	const lastElement = useCallback(node => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && NotificationLength === limit) {
				setLimit(prevLimit => prevLimit + 5);
			}

			if (entries[0].isIntersecting && searchLength === limit) {
				setLimit(prevLimit => prevLimit + 5);
			}
		});
		if (node) observer.current.observe(node);
	});

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleHome = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push('/');
	};

	const handleFeed = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push('/feed');
	};

	const handleSignup = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push('/signup');
	};

	const handleAccount = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push(
			`/${sessionStorage.getItem('firstName')}${sessionStorage.getItem(
				'lastName'
			)}${sessionStorage.getItem('id')}`.toLowerCase()
		);
	};

	const handleLogin = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
		history.push('/login');
	};

	const handleLogout = () => {
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('firstName');
		sessionStorage.removeItem('lastName');
		sessionStorage.removeItem('profilePicture');
		sessionStorage.removeItem('role');
		sessionStorage.removeItem('token');
		setAnchorEl(null);
		handleMobileMenuClose();
		location.href = '/login';
	};

	const handleClickNotification = newPlacement => event => {
		setAnchor(event.currentTarget);
		setOpen(prev => placement !== newPlacement || !prev);
		setPlacement(newPlacement);
	};

	const handleReadNotification = (notificationId, postId) => {
		dispatch(readNotificationAction(notificationId));
		location.replace(`/post/${postId}`);
	};

	const reReadNotification = postId => {
		location.replace(`/post/${postId}`);
	};

	const handleReadAllNotifications = () => {
		dispatch(markAllAsReadAction());
	};

	const handleDisplayContent = e => {
		setDisplay(true);
		setValue(e.target.value);
		dispatch(searchAction(e.target.value, page, limit));
	};

	const handleViewUser = (id, firstName, lastName) => {
		location.replace(`${firstName}${lastName}${id}`.toLowerCase());
		setDisplay(false);
	};

	useEffect(() => {
		if (sessionStorage.getItem('id')) {
			dispatch(getNotificationAction(page, limit));
			dispatch(getUsersAction());
			dispatch(countNotificationsAction());
			dispatch(searchAction(value, page, limit));
		}
	}, [limit, readNotification, messageCount]);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleAccount}>My account</MenuItem>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{sessionStorage.getItem('id') ? (
				<div>
					<MenuItem>
						<IconButton color='inherit' onClick={handleFeed}>
							<HomeIcon />
						</IconButton>
						<p onClick={handleFeed}>Feed</p>
					</MenuItem>
					<MenuItem>
						<IconButton aria-label='show 11 new notifications' color='inherit'>
							<Badge badgeContent={11} color='secondary'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<p>Notifications</p>
					</MenuItem>
					<MenuItem onClick={handleProfileMenuOpen}>
						<IconButton
							aria-label='account of current user'
							aria-controls='primary-search-account-menu'
							aria-haspopup='true'
							color='inherit'
						>
							<Avatar
								src={`${process.env.API_URL}/${sessionStorage.getItem(
									'profilePicture'
								)}`}
							>
								{sessionStorage.getItem('firstName').charAt(0)}
							</Avatar>
						</IconButton>
						<p>{`${sessionStorage.getItem(
							'firstName'
						)} ${sessionStorage.getItem('lastName')}`}</p>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem>
						<IconButton onClick={handleHome} color='inherit'>
							<HomeIcon />
						</IconButton>
						<p onClick={handleHome}>Promoclub</p>
					</MenuItem>
					<MenuItem>
						<IconButton onClick={handleSignup} color='inherit'>
							<VpnKeyIcon />
						</IconButton>
						<p onClick={handleSignup}>Signup</p>
					</MenuItem>
					<MenuItem>
						<IconButton onClick={handleLogin} color='inherit'>
							<LockOpenIcon />
						</IconButton>
						<p onClick={handleLogin}>Login</p>
					</MenuItem>
				</div>
			)}
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='fixed' style={{ backgroundColor: '#126eb0' }}>
				<Container>
					<Toolbar>
						{!sessionStorage.getItem('id') ? (
							<Typography className={classes.title} variant='h4'>
								<NavLink
									to='/'
									exact
									className='link-active'
									activeClassName='active'
								>
									Promoclub
								</NavLink>
							</Typography>
						) : (
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder='Search user by names…'
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									value={value}
									inputProps={{ 'aria-label': 'search' }}
									onChange={handleDisplayContent}
								/>
							</div>
						)}
						{display && value !== '' ? (
							<Paper className={classes.dropDown}>
								<Grid container direction='column' spacing={1}>
									{search.data.length === 0 ? (
										<CircularProgress
											size={10}
											className={classes.circularProgress}
										/>
									) : search.data.rows.length === 0 ? (
										'No search found'
									) : (
										search.data.rows.map(result => (
											<Grid item key={result.id} ref={lastElement}>
												<Grid
													container
													direction='row'
													alignItems='center'
													spacing={1}
													className={classes.searchContainer}
													onClick={() =>
														handleViewUser(
															result.id,
															result.firstName,
															result.lastName
														)
													}
												>
													<Grid item>
														<Avatar
															src={`${process.env.API_URL}/${result.profilePicture}`}
															variant='square'
														></Avatar>
													</Grid>
													<Grid item>
														<Typography>
															{result.firstName} {result.lastName}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
										))
									)}
									{searchLength !== limit && search.loading ? (
										''
									) : (
										<CircularProgress
											size={10}
											className={classes.circularProgress}
										/>
									)}
								</Grid>
							</Paper>
						) : (
							''
						)}
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							{sessionStorage.getItem('id') ? (
								<div>
									<IconButton color='inherit'>
										<NavLink
											to='/feed'
											className='link-active'
											activeClassName='active'
										>
											<HomeIcon />
										</NavLink>
									</IconButton>
									<IconButton
										color='inherit'
										onClick={handleClickNotification('bottom')}
									>
										{totalNotifications !== undefined && (
											<Badge
												badgeContent={totalNotifications.length}
												color='secondary'
											>
												<NotificationsIcon />
											</Badge>
										)}
									</IconButton>
									<Popper open={open} anchorEl={anchor} placement={placement}>
										{notifications.data.rows !== undefined &&
										notifications.data.rows.length > 10 ? (
											<Paper
												style={{
													marginTop: 15,
													maxWidth: 350,
													maxHeight: 400,
													padding: 10,
													overflow: 'scroll',
												}}
											>
												<Grid container direction='column' spacing={2}>
													<Grid item>
														<Typography
															component='div'
															className={classes.markAll}
															onClick={handleReadAllNotifications}
														>
															{markAll.loading ? (
																<CircularProgress
																	size={10}
																	className={classes.circularProgress}
																/>
															) : (
																'Mark all notifications as read'
															)}
														</Typography>
													</Grid>
													<Grid item>
														{notifications.data.length === 0 ? (
															<CircularProgress
																size={10}
																className={classes.circularProgress}
															/>
														) : notifications.data.rows.length === 0 ? (
															'no notification to show'
														) : (
															notifications.data.rows.map(notification => {
																const user = users.find(
																	u => u.id === notification.senderId
																);
																return (
																	<Grid
																		container
																		direction='row'
																		spacing={2}
																		key={notification.id}
																		ref={lastElement}
																		style={{ backgroundColor: 'lightgray' }}
																	>
																		{notification.read ? (
																			<>
																				<Grid
																					item
																					md={2}
																					style={{
																						backgroundColor: 'white',
																						cursor: 'pointer',
																					}}
																					onClick={() =>
																						reReadNotification(
																							notification.postId
																						)
																					}
																				>
																					<Avatar
																						src={`${process.env.API_URL}/${
																							user && user.profilePicture
																						}`}
																					></Avatar>
																				</Grid>
																				<Grid
																					item
																					md={10}
																					style={{
																						backgroundColor: 'white',
																						cursor: 'pointer',
																					}}
																					onClick={() =>
																						reReadNotification(
																							notification.postId
																						)
																					}
																				>
																					{notification.type === 'comment' ? (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} commented
																							on your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					) : (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} liked on
																							your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					)}
																					<Divider />
																				</Grid>
																			</>
																		) : (
																			<>
																				<Grid
																					item
																					md={2}
																					className={classes.readNotification}
																					onClick={() =>
																						handleReadNotification(
																							notification.id,
																							notification.postId
																						)
																					}
																				>
																					<Avatar
																						src={`${process.env.API_URL}/${
																							user && user.profilePicture
																						}`}
																					></Avatar>
																				</Grid>
																				<Grid
																					item
																					md={10}
																					className={classes.readNotification}
																					onClick={() =>
																						handleReadNotification(
																							notification.id,
																							notification.postId
																						)
																					}
																				>
																					{notification.type === 'comment' ? (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} commented
																							on your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					) : (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} liked on
																							your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					)}
																					<Divider />
																				</Grid>
																			</>
																		)}
																	</Grid>
																);
															})
														)}
														{NotificationLength !== limit &&
														notifications.loading ? (
															''
														) : (
															<CircularProgress
																size={10}
																className={classes.circularProgress}
															/>
														)}
													</Grid>
												</Grid>
											</Paper>
										) : (
											<Paper
												style={{
													marginTop: 15,
													maxWidth: 350,
													maxHeight: 400,
													padding: 10,
												}}
											>
												<Grid container direction='column' spacing={2}>
													<Grid item>
														<Typography
															component='div'
															className={classes.markAll}
															onClick={handleReadAllNotifications}
														>
															{markAll.loading ? (
																<CircularProgress
																	size={10}
																	className={classes.circularProgress}
																/>
															) : (
																'Mark all notifications as read'
															)}
														</Typography>
													</Grid>
													<Grid item>
														{notifications.data.length === 0 ? (
															<CircularProgress
																size={10}
																className={classes.circularProgress}
															/>
														) : notifications.data.rows.length === 0 ? (
															'no notification to show'
														) : (
															notifications.data.rows.map(notification => {
																const user = users.find(
																	u => u.id === notification.senderId
																);
																return (
																	<Grid
																		container
																		direction='row'
																		spacing={2}
																		key={notification.id}
																		ref={lastElement}
																		style={{ backgroundColor: 'lightgray' }}
																	>
																		{notification.read ? (
																			<>
																				<Grid
																					item
																					md={2}
																					style={{
																						backgroundColor: 'white',
																						cursor: 'pointer',
																					}}
																					onClick={() =>
																						reReadNotification(
																							notification.postId
																						)
																					}
																				>
																					<Avatar
																						src={`${process.env.API_URL}/${
																							user && user.profilePicture
																						}`}
																					></Avatar>
																				</Grid>
																				<Grid
																					item
																					md={10}
																					style={{
																						backgroundColor: 'white',
																						cursor: 'pointer',
																					}}
																					onClick={() =>
																						reReadNotification(
																							notification.postId
																						)
																					}
																				>
																					{notification.type === 'comment' ? (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} commented
																							on your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					) : (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} liked on
																							your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					)}
																					<Divider />
																				</Grid>
																			</>
																		) : (
																			<>
																				<Grid
																					item
																					md={2}
																					className={classes.readNotification}
																					onClick={() =>
																						handleReadNotification(
																							notification.id,
																							notification.postId
																						)
																					}
																				>
																					<Avatar
																						src={`${process.env.API_URL}/${
																							user && user.profilePicture
																						}`}
																					></Avatar>
																				</Grid>
																				<Grid
																					item
																					md={10}
																					className={classes.readNotification}
																					onClick={() =>
																						handleReadNotification(
																							notification.id,
																							notification.postId
																						)
																					}
																				>
																					{notification.type === 'comment' ? (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} commented
																							on your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					) : (
																						<Typography
																							variant='body2'
																							color='textSecondary'
																						>
																							{user && user.firstName}{' '}
																							{user && user.lastName} liked on
																							your post. <br />
																							{moment(
																								notification.createdAt
																							).calendar({
																								sameDay: `[${moment(
																									notification.createdAt
																								).fromNow()}]`,
																								sameElse: `[${moment(
																									notification.createdAt
																								).format('Do MMMM YYYY')}]`,
																							})}
																						</Typography>
																					)}
																					<Divider />
																				</Grid>
																			</>
																		)}
																	</Grid>
																);
															})
														)}
													</Grid>
												</Grid>
											</Paper>
										)}
									</Popper>
									<IconButton
										edge='end'
										aria-label='account of current user'
										aria-controls={menuId}
										aria-haspopup='true'
										onClick={handleProfileMenuOpen}
										color='inherit'
									>
										<Avatar
											src={`${process.env.API_URL}/${sessionStorage.getItem(
												'profilePicture'
											)}`}
										>
											{sessionStorage.getItem('firstName').charAt(0)}
										</Avatar>
										&nbsp;
										<span className='link-active'>
											{`${sessionStorage.getItem(
												'firstName'
											)} ${sessionStorage.getItem('lastName')}`}
										</span>
									</IconButton>
								</div>
							) : (
								<div>
									<IconButton color='inherit'>
										<NavLink
											to='/signup'
											className='link-active'
											activeClassName='active'
										>
											Signup
										</NavLink>
									</IconButton>
									<IconButton color='inherit'>
										<NavLink
											to='/login'
											className='link-active'
											activeClassName='active'
										>
											Login
										</NavLink>
									</IconButton>
								</div>
							)}
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label='show more'
								aria-controls={mobileMenuId}
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
};

export default Navigation;
