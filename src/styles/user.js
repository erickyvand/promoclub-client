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
}));

export default useStyles;