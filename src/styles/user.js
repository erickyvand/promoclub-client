import { makeStyles, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(4, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	root: {
		marginTop: 100,
	},
	rootReset: {
		marginTop: 200,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		marginTop: '20px',
		backgroundColor: '#126eb0',
		color: 'white',
		textTransform: 'none',
		fontSize: '1em',
		'&:hover': {
			backgroundColor: fade('#4791db', 0.8),
		},
	},
	avatarLarge: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		cursor: 'pointer',
	},
	helperText: {
		color: '#f44336',
	},
	// user profile
	rootTab: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		marginTop: 20,
	},
	cover: {
		width: '100%',
		height: 300,
		backgroundColor: '#303840',
	},
	profileImage: {
		width: 200,
		height: 200,
		borderRadius: 100,
		margin: '-100px 0px 0px 50px',
	},
	input: {
		display: 'none',
		margin: 5,
	},
	camera: {
		position: 'absolute',
		top: 155,
		left: 75,
		display: 'block',
		cursor: 'pointer',
	},
	avatarEditProfile: {
		width: 150,
		height: 150,
		border: '1px solid grey',
		position: 'relative',
	},
}));

export default useStyles;
