import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Image from '../../../assets/notfound.png';
import Footer from './Footer';

const PageNotFound = () => {
	return (
		<div>
			<Grid container direction='column' justify='center' alignItems='center'>
				<Grid item xs={12} sm={12}>
					<Typography variant='h1'>Page Not Found</Typography>
				</Grid>
				<Grid item xs={12} sm={12}>
					<img src={Image} alt='Page Not found' />
				</Grid>
			</Grid>
			<Footer />
		</div>
	);
};

export default PageNotFound;
