import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Badge,
	MenuItem,
	Menu,
	Container,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MoreIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import useStyles from '../../styles/Layouts';

const Navigation = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
			<MenuItem>
				<IconButton color='inherit'>
					<HomeIcon />
				</IconButton>
				<p>Home</p>
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
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem>
				<IconButton color='inherit'>
					<VpnKeyIcon />
				</IconButton>
				<p>Signup</p>
			</MenuItem>
			<MenuItem>
				<IconButton color='inherit'>
					<LockOpenIcon />
				</IconButton>
				<p>Login</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='fixed' style={{ backgroundColor: '#126eb0' }}>
				<Container>
					<Toolbar>
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
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton color='inherit'>
								<HomeIcon />
							</IconButton>
							<IconButton color='inherit'>
								<Badge badgeContent={100} color='secondary'>
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								color='inherit'
							>
								<AccountCircle />{' '}
								<span className='link-active'>Ericky Vand</span>
							</IconButton>
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
