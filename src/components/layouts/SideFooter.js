import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const SideFooter = () => {
	return (
		<div className='side-profile'>
			<Paper elevation={6} style={{ padding: 10 }}>
				<Typography variant='subtitle1'>Promoclub LTD</Typography>
				<Typography variant='subtitle1'>All right reserved</Typography>
				<Typography variant='subtitle2'>
					erickyvand &copy; {new Date().getFullYear()}
				</Typography>
			</Paper>
		</div>
	);
};

export default SideFooter;
