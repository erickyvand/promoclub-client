import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Formik, Form } from 'formik';
import useStyles from '../../styles/user';
import { emailSchema } from '../../validations/userValidation';
import { searchAccountAction } from '../../redux/actions/authAction';

const handleDisable = (props, searchAccount) => {
	if (!props.values.email || searchAccount.loading) {
		return true;
	} else {
		return false;
	}
};

const SearchAccount = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const searchAccount = useSelector(state => state.searchAccount);

	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = values => {
		dispatch(searchAccountAction(values));
	};
	return (
		<div className={classes.rootReset}>
			<Grid container direction='row' justify='center'>
				<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
					<div className={classes.paper}>
						<Collapse in={open}>
							{searchAccount.error && (
								<Alert severity='error' onClose={handleClose}>
									{searchAccount.error && searchAccount.error}
								</Alert>
							)}
						</Collapse>
						{searchAccount.message && (
							<Alert severity='success'>
								{searchAccount.message && searchAccount.message}
							</Alert>
						)}
						<Typography variant='h6' color='inherit'>
							Enter your email to find your account
						</Typography>
						<Formik
							validationSchema={emailSchema}
							initialValues={{ email: '' }}
							onSubmit={(values, { resetForm }) => {
								resetForm();
								handleSubmit(values);
							}}
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
									<Button
										type='submit'
										variant='contained'
										fullWidth
										disabled={handleDisable(props, searchAccount)}
										className={classes.submit}
									>
										{searchAccount.loading ? 'Loading...' : 'Find Account'}
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

export default SearchAccount;
