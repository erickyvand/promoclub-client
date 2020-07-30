import React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../../redux/actions/authAction';
import useStyles from '../../styles/user';
import { signupSchema } from '../../validations/userValidation';
import Footer from '../layouts/Footer';

const handleDisable = (props, signup) => {
	if (
		!props.values.firstName ||
		!props.values.lastName ||
		!props.values.email ||
		!props.values.password ||
		!props.values.confirmPassword ||
		props.values.password !== props.values.confirmPassword ||
		signup.loading
	) {
		return true;
	} else {
		return false;
	}
};

const Signup = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const signup = useSelector(state => state.signup);

	const handleSubmitSignup = values => {
		dispatch(signupAction(values));
	};
	return (
		<div className={classes.root}>
			<Grid container direction='row' justify='space-between'>
				<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
					<div className={classes.paper}>
						<Typography variant='h6'>
							Signup here or if you have an account singin on the right side.
						</Typography>
						<Formik
							validationSchema={signupSchema}
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
								password: '',
								confirmPassword: '',
							}}
							onSubmit={values => handleSubmitSignup(values)}
						>
							{props => (
								<Form onSubmit={props.handleSubmit} className={classes.form}>
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='firstName'
										label='First Name'
										name='firstName'
										type='text'
										onChange={props.handleChange('firstName')}
										value={props.values.firstName}
										autoComplete='firstName'
										error={
											props.values.firstName !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'firstName'
											)
										}
										helperText={
											props.values.firstName !== '' && props.errors.firstName
										}
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
										onChange={props.handleChange('lastName')}
										value={props.values.lastName}
										autoComplete='lastName'
										error={
											props.values.lastName !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'lastName'
											)
										}
										helperText={
											props.values.lastName !== '' && props.errors.lastName
										}
									/>
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='email'
										label='Email'
										name='email'
										type='text'
										onChange={props.handleChange('email')}
										value={props.values.email}
										autoComplete='email'
										error={
											props.values.email !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'email'
											)
										}
										helperText={props.values.email !== '' && props.errors.email}
									/>
									<Typography color='error'>
										{signup.error && signup.error}
									</Typography>
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='password'
										label='Password'
										name='password'
										type='password'
										onChange={props.handleChange('password')}
										value={props.values.password}
										autoComplete='password'
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
									<TextField
										variant='standard'
										margin='normal'
										fullWidth
										size='small'
										id='confirmPassword'
										label='Confirm Password'
										name='confirmPassword'
										type='password'
										onChange={props.handleChange('confirmPassword')}
										value={props.values.confirmPassword}
										autoComplete='confirmPassword'
										error={
											props.values.confirmPassword !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'confirmPassword'
											)
										}
										helperText={
											props.values.confirmPassword !== '' &&
											props.errors.confirmPassword
										}
									/>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										disabled={handleDisable(props, signup)}
										className={classes.submit}
									>
										{signup.loading ? 'Loading...' : 'Signup'}
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={5}>
					<Paper>Login</Paper>
				</Grid>
			</Grid>
			<Footer />
		</div>
	);
};

export default Signup;
