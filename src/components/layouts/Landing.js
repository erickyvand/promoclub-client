import React, { useEffect } from 'react';
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
} from '@material-ui/core';
import FadeIn from 'react-fade-in';
import useStyles from '../../styles/Layouts';

const Landing = () => {
	const classes = useStyles();

	useEffect(() => {
		document.title = 'Promoclub';
	}, []);

	return (
		<div>
			<FadeIn delay='500'>
				<Grid container direction='row' justify='center'>
					<Typography variant='h4'>
						Welcome to Promoclub Social Media
					</Typography>
				</Grid>
				<Grid container spacing={2} direction='row' justify='space-between'>
					<Grid item xs={12} sm={12} md={6}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									style={{ height: '300px' }}
									image='/assets/selfie.jpg'
									title='Ladies taking selfie'
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										Selfie
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										On this platform you can share to the world your favorite
										pictures and videos
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									style={{ height: '300px' }}
									image='/assets/connect.jpeg'
									title='Group of people'
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										Connection
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										By posting your pictures you can connect with different
										people around the world
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} sm={12}>
						<Typography variant='h3'>
							With Promoclub post your thoughts.
						</Typography>
					</Grid>
				</Grid>
			</FadeIn>
		</div>
	);
};

export default Landing;
