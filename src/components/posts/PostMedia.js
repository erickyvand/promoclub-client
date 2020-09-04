import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewOwnPostsAction } from '../../redux/actions/postAction';
import useStyles from '../../styles/postStyle';
import { CircularProgress } from '@material-ui/core';

const PostMedia = ({ userId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const ownPosts = useSelector(state => state.ownPosts);

	const [page] = useState(1);
	const [limit, setLimit] = useState(2);

	let postLength;
	if (ownPosts.data.rows !== undefined) {
		postLength = ownPosts.data.rows.length;
	}

	const observer = useRef();
	const lastElement = useCallback(node => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && postLength === limit) {
				setLimit(prevLimit => prevLimit + 5);
			}
		});
		if (node) observer.current.observe(node);
	});

	useEffect(() => {
		dispatch(viewOwnPostsAction(userId, page, limit));
	}, [limit, userId]);

	return (
		<div className={classes.rootMedia}>
			{ownPosts.data.length === 0 ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : ownPosts.data.rows.length === 0 ? (
				<span className={classes.noPostMessage}>
					No photos or videos to show
				</span>
			) : (
				ownPosts.data.rows.map(photo => (
					<div ref={lastElement} key={photo.id}>
						{photo.fileType === 'image/jpg' ||
						photo.fileType === 'image/jpeg' ||
						photo.fileType === 'image/png' ||
						photo.fileType === 'image/gif' ? (
							<img
								src={`${process.env.API_URL}/${photo.mediaFile}`}
								alt=''
								style={{
									cursor: 'pointer',
									height: 300,
									width: 300,
								}}
							/>
						) : photo.fileType === 'video/mp4' ||
						  photo.fileType === 'video/x-m4v' ? (
							<video
								src={`${process.env.API_URL}/${photo.mediaFile}`}
								controls
								style={{
									height: 300,
									width: 300,
									border: '1px solid grey',
									cursor: 'pointer',
								}}
							/>
						) : (
							''
						)}
					</div>
				))
			)}
			{ownPosts.loading ? (
				<CircularProgress size={10} className={classes.circularProgress} />
			) : (
				''
			)}
		</div>
	);
};

export default PostMedia;
