import React from 'react';
import { Divider, Grid } from '@material-ui/core';

const Footer = () => {
	return (
		<div style={{ marginTop: 'auto' }}>
			<Divider />
			<Grid item xs={12} sm={12}>
				<p style={{ textAlign: 'center' }}>
					Ericky Vand - All rights reserved &copy; 2020 -{' '}
					{new Date().getFullYear()}
				</p>
			</Grid>
		</div>
	);
};

export default Footer;
