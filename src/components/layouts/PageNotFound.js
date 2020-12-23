import React from 'react';
import {
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from '@material-ui/core';
import useStyles from '../../styles/Layouts';
import Footer from './Footer';

const PageNotFound = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid container direction='column' justify='center' alignItems='center'>
				<Grid item xs={12} sm={12}>
					<Typography variant='h1'>Page Not Found</Typography>
				</Grid>
				<Grid item xs={12} sm={12}>
					<Card className={classes.card}>
						<CardActionArea>
							<CardMedia
								style={{ height: '300px' }}
								image='./assets/notfound.png'
								title='Group of people'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='h2'>
									Check well again
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									It seems that the page you are trying to search does not
									exits, try to go back to the previews page.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
			<Footer />
		</div>
	);
};

export default PageNotFound;
