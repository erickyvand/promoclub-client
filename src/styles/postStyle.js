const { makeStyles, fade } = require('@material-ui/core');

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: 80,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	input: {
		display: 'none',
		margin: 5,
	},
	imgPreview: {
		margin: 5,
		width: '100%',
		maxHeight: '350px',
		borderRadius: '10px',
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
