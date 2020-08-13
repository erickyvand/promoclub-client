const { makeStyles, fade } = require('@material-ui/core');

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: 80,
	},
	form: {
		width: '96%',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		margin: 'auto',
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
	imagePost: {
		width: 'auto',
		height: 300,
		display: 'block',
		margin: 'auto',
		border: 'none',
		cursor: 'pointer',
	},
	videoPost: {
		width: 'auto',
		height: 300,
		display: 'block',
		margin: 'auto',
		border: 'none',
		cursor: 'pointer',
	},
	nameTitle: {
		textDecoration: 'none',
		color: '#0a0a0a',
		fontWeight: 'bold',
	},
	rootMedia: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	noPostMessage: {
		fontSize: '1.2em',
		display: 'block',
		textAlign: 'center',
	},
	circularProgress: {
		display: 'block',
		margin: 'auto',
	},
}));

export default useStyles;