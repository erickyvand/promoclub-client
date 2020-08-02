import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Grid,
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button,
	FormHelperText,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import useStyles from '../../styles/user';
import { Formik, Form } from 'formik';
import { passwordSchema } from '../../validations/userValidation';
import { resetPasswordAction } from '../../redux/actions/authAction';
import { Redirect } from 'react-router-dom';

const handleDisable = (props, resetPassword) => {
	if (
		!props.values.password ||
		!props.values.confirmPassword ||
		resetPassword.loading
	) {
		return true;
	} else {
		return false;
	}
};

const ResetPassword = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const resetPassword = useSelector(state => state.resetPassword);

	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

	const handleClickShowPassword = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleClickShowConfirmPassword = () => {
		setConfirmPasswordShown(passwordShown ? false : true);
	};

	const handleSubmit = values => {
		dispatch(resetPasswordAction(values));
	};

	if (resetPassword.error) {
		return <Redirect to='/' />;
	}

	if (resetPassword.message) {
		return <Redirect to='/login' />;
	}

	return (
		<div className={classes.rootReset}>
			<Grid container direction='row' justify='center'>
				<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
					<div className={classes.paper}>
						<Typography variant='h6' color='inherit'>
							Reset your password
						</Typography>
						<Formik
							validationSchema={passwordSchema}
							initialValues={{ password: '', confirmPassword: '' }}
							onSubmit={values => handleSubmit(values)}
						>
							{props => (
								<Form onSubmit={props.handleSubmit} className={classes.form}>
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
									<FormControl fullWidth={true} margin='normal'>
										<InputLabel htmlFor='confirmPassword'>
											Confirm Password
										</InputLabel>
										<Input
											id='confirmPassword'
											name='confirmPassword'
											type={confirmPasswordShown ? 'text' : 'password'}
											value={props.values.confirmPassword}
											onChange={props.handleChange('confirmPassword')}
											error={
												props.values.confirmPassword !== '' &&
												Object.prototype.hasOwnProperty.call(
													props.errors,
													'confirmPassword'
												)
											}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowConfirmPassword}
													>
														{confirmPasswordShown ? (
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
												props.values.confirmPassword !== '' &&
												props.errors.confirmPassword
											}
											className={classes.helperText}
										/>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										fullWidth
										disabled={handleDisable(props, resetPassword)}
										className={classes.submit}
									>
										{resetPassword.loading ? 'Loading...' : 'Reset Password'}
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ResetPassword;
