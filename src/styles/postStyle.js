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
		color: '#126eb0',
		fontWeight: 'bold',
		'&:hover': {
			textDecoration: 'underline',
		},
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
	// Comments styles
	commentRoot: {
		width: '100%',
	},
	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'lightgray !important',
		borderRadius: 20,
		position: 'absolute',
	},
	emoji: {
		position: 'relative',
		right: '50px',
		bottom: '4px',
	},
	editComment: {
		fontSize: '0.8em',
		color: '#126eb0',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	deleteComment: {
		fontSize: '0.8em',
		color: '#126eb0',
		'&:hover': {
			color: '#912b0c',
			textDecoration: 'underline',
		},
	},

	// Edit post
	formEdit: {
		width: '100%',
		marginTop: theme.spacing(1),
	},

	// Delete Post
	deletePost: {
		'&:hover': {
			color: '#912b0c',
		},
	},
}));

export default useStyles;
