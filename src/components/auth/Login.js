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
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authAction';

const loginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const login = useSelector(state => state.login);
	console.log(login);

	const [open, setOpen] = useState(true);

	const handleLoginSubmit = values => {
		dispatch(loginAction(values));
	};

	if (login.redirect) {
		sessionStorage.setItem('id', login.data.user.id);
		sessionStorage.setItem('firstName', login.data.user.firstName);
		sessionStorage.setItem('lastName', login.data.user.lastName);
		sessionStorage.setItem('role', login.data.user.role);
		sessionStorage.setItem('token', login.data.token);
		return <Redirect to='/feed' />;
	}

	const handleClode = () => {
		setOpen(false);
	};
	return (
		<div className={classes.root}>
			<Grid container direction='row' justify='center'>
				<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
					<div className={classes.paper}>
						<Collapse in={open}>
							{login.error && (
								<Alert severity='error' onClose={handleClode}>
									{login.error && login.error}
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
								<form onSubmit={props.handleSubmit} className={classes.form}>
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
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='password'
										label='Password'
										name='password'
										type='password'
										value={props.values.password}
										onChange={props.handleChange('password')}
										error={
											props.values.password !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'password'
											)
										}
										helperText={
											props.values.password !== '' && props.errors.password
										}
									/>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										className={classes.submit}
									>
										Login
									</Button>
								</form>
							)}
						</Formik>
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
									className={classes.avatarLarge}
								/>
							</Grid>
							<Grid item>or</Grid>
							<Grid item>
								<Avatar
									alt='Facebook'
									src='/assets/facebook.png'
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
