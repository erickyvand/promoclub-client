import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	TextField,
	Grid,
	Avatar,
	IconButton,
	Popper,
	ClickAwayListener,
	MenuList,
	Typography,
} from '@material-ui/core';
import { Picker, Emoji } from 'emoji-mart';
import useStyles from '../../styles/postStyle';
import { commentAction } from '../../redux/actions/postAction';

const Comment = ({ postId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [allow, setAllow] = useState(false);
	const [open, setOpen] = useState(false);
	const [comment, setComment] = useState('');
	const anchorRef = useRef(null);

	const handleChange = e => {
		setComment(e.target.value);
	};

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const addEmoji = e => {
		if (comment === undefined) {
			setComment(e.native);
		} else {
			setComment(comment + e.native);
		}
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const handleKey = e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			setAllow(false);

			const formData = new FormData();
			formData.append('comment', comment);

			dispatch(commentAction(postId, formData));
		} else {
			setAllow(true);
		}
	};
	return (
		<div className={classes.commentRoot}>
			<Grid container direction='row' spacing={1}>
				<Grid item xs={2} sm={1} md={1}>
					<Avatar
						src={`${process.env.API_URL}/${sessionStorage.getItem(
							'profilePicture'
						)}`}
					>
						{sessionStorage.getItem('firstName').charAt(0)}
					</Avatar>
				</Grid>
				<Grid item xs={9} sm={10} md={10}>
					<TextField
						variant='outlined'
						name='comment'
						fullWidth
						autoFocus
						size='small'
						value={comment === undefined ? '' : comment}
						InputProps={{
							classes: {
								notchedOutline: classes.notchedOutline,
							},
						}}
						multiline={allow}
						placeholder='Add a comment...'
						onKeyDown={handleKey}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<IconButton
						title='Insert an emoji'
						ref={anchorRef}
						onClick={handleToggle}
						className={classes.emoji}
					>
						<Emoji emoji={{ id: 'smiley', skin: 3 }} size={22} />
					</IconButton>
					<Popper open={open} anchorEl={anchorRef.current}>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								style={{ float: 'right' }}
								autoFocusItem={open}
								id='menu-list-grow'
							>
								<Picker onSelect={addEmoji} />
							</MenuList>
						</ClickAwayListener>
					</Popper>
				</Grid>
			</Grid>
			<Grid container direction='row' spacing={1}>
				<Grid item xs={2} sm={1} md={1}>
					<Avatar src=''></Avatar>
				</Grid>
				<Grid item xs={10} sm={11} md={11}>
					<Typography
						variant='subtitle2'
						component='div'
						style={{ backgroundColor: '#e4e8ed', padding: 10, borderRadius: 20 }}
					>
						<span className={classes.nameTitle}>Ericky Vand</span> Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Nesciunt velit dolor
						voluptates culpa similique tempore officia, vel autem sequi eum
						veniam et optio praesentium? Commodi error ut et esse distinctio!
					</Typography>
					<Grid container direction='row' spacing={1}>
						<Grid item>
							<Typography style={{ fontSize: '0.8em', color: 'gray' }}>
								15h
							</Typography>{' '}
						</Grid>
						<Grid item>
							<Typography className={classes.editComment}>edit</Typography>{' '}
						</Grid>
						<Grid item>
							<Typography className={classes.deleteComment}>delete</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Comment;
