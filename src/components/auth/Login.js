import React, { useState } from 'react';
import useStyles from '../../styles/user';
import {
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Avatar,
	Collapse,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	FormHelperText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authAction';
import { loginSchema } from '../../validations/userValidation';

const handleDisable = (props, login) => {
	if (!props.values.email || !props.values.password || login.loading) {
		return true;
	} else {
		return false;
	}
};

const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const login = useSelector(state => state.login);
	const resetPassword = useSelector(state => state.resetPassword);

	const [open, setOpen] = useState(true);
	const [unlock, setUnlock] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);

	const handleClickShowPassword = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleLoginSubmit = values => {
		dispatch(loginAction(values));
	};

	const handleGoogle = () => {
		location.replace(`${process.env.API_URL}/api/auth/google`);
	};

	const handleFacebook = () => {
		location.replace(`${process.env.API_URL}/api/auth/facebook`);
	};

	if (login.redirect) {
		sessionStorage.setItem('id', login.data.user.id);
		sessionStorage.setItem('firstName', login.data.user.firstName);
		sessionStorage.setItem('lastName', login.data.user.lastName);
		sessionStorage.setItem('profilePicture', login.data.user.profilePicture);
		sessionStorage.setItem('role', login.data.user.role);
		sessionStorage.setItem('token', login.data.token);
		location.href = '/feed';
	}

	const handleClose = () => {
		history.go();
		setOpen(false);
		setUnlock(false);
	};
	return (
		<div className={classes.root}>
			<Grid container direction='row' justify='center'>
				<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
					<div className={classes.paper}>
						<Collapse in={open}>
							{login.error && (
								<Alert severity='error' onClose={handleClose}>
									{login.error && login.error}
								</Alert>
							)}
						</Collapse>
						<Collapse in={unlock}>
							{resetPassword.message && (
								<Alert severity='success' onClose={handleClose}>
									{resetPassword.message && resetPassword.message}
								</Alert>
							)}
						</Collapse>
						<Typography variant='h6'>Login</Typography>
						<Formik
							validationSchema={loginSchema}
							initialValues={{ email: '', password: '' }}
							onSubmit={values => handleLoginSubmit(values)}
						>
							{props => (
								<Form onSubmit={props.handleSubmit} className={classes.form}>
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='email'
										label='Email'
										name='email'
										type='text'
										value={props.values.email}
										onChange={props.handleChange('email')}
										error={
											props.values.email !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'email'
											)
										}
										helperText={props.values.email !== '' && props.errors.email}
									/>
									<FormControl fullWidth={true} margin='normal'>
										<InputLabel htmlFor='password'>Password</InputLabel>
										<Input
											id='password'
											name='password'
											type={passwordShown ? 'text' : 'password'}
											value={props.values.password}
											onChange={props.handleChange('password')}
											error={
												props.values.password !== '' &&
												Object.prototype.hasOwnProperty.call(
													props.errors,
													'password'
												)
											}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
													>
														{passwordShown ? (
															<VisibilityOffIcon />
														) : (
															<VisibilityIcon />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
										<FormHelperText
											children={
												props.values.password !== '' && props.errors.password
											}
											className={classes.helperText}
										/>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										disabled={handleDisable(props, login)}
										className={classes.submit}
									>
										{login.loading ? 'Loading...' : 'Signup'}
									</Button>
								</Form>
							)}
						</Formik>
						<Grid
							container
							direction='row'
							justify='flex-end'
							alignItems='flex-end'
						>
							<p>
								<Link to='/search-account'>Forget Password</Link>
							</p>
						</Grid>
						<p>Login with:</p>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
							spacing={2}
						>
							<Grid item>
								<Avatar
									alt='Google'
									src='/assets/google.jpg'
									onClick={handleGoogle}
									className={classes.avatarLarge}
								/>
							</Grid>
							<Grid item>or</Grid>
							<Grid item>
								<Avatar
									alt='Facebook'
									src='/assets/facebook.png'
									onClick={handleFacebook}
									className={classes.avatarLarge}
								/>
							</Grid>
						</Grid>
						<p>
							Don't you have an account? <Link to='/signup'>Signup</Link>
						</p>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
