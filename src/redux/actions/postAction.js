import {
	POST,
	VIEW_POSTS,
	OWN_POSTS,
	COMMENT,
	VIEW_COMMENTS,
	ALL_COMMENTS,
	EDIT_PROFILE,
	DELETE_POST,
	EDIT_COMMENT,
	DELETE_COMMENT,
	LIKE_POST,
	COUNT_LIKE,
	UNLIKE_POST,
	COUNT_UNLIKE,
} from '../actionType';
import {
	postService,
	viewPostService,
	viewOwnPostService,
	commentService,
	viewCommentService,
	allCommentsService,
	editPostService,
	deletePostService,
	editCommentService,
	deleteCommentService,
	likePostService,
	countLikeService,
	unlikePostService,
	countUnlikeService,
} from '../../services/postService';

export const postAction = data => {
	return {
		type: POST,
		payload: postService(data),
	};
};

export const viewPostsAction = (page, limit) => {
	return {
		type: VIEW_POSTS,
		payload: viewPostService(page, limit),
	};
};

export const viewOwnPostsAction = (userId, page, limit) => {
	return {
		type: OWN_POSTS,
		payload: viewOwnPostService(userId, page, limit),
	};
};

export const commentAction = (postId, data) => {
	return {
		type: COMMENT,
		payload: commentService(postId, data),
	};
};

export const viewCommentAction = (postId, page, limit) => {
	return {
		type: VIEW_COMMENTS,
		payload: viewCommentService(postId, page, limit),
	};
};

export const allCommentsAction = () => {
	return {
		type: ALL_COMMENTS,
		payload: allCommentsService(),
	};
};

export const editPostAction = (postId, data) => {
	return {
		type: EDIT_PROFILE,
		payload: editPostService(postId, data),
	};
};

export const deletePostAction = postId => {
	return {
		type: DELETE_POST,
		payload: deletePostService(postId),
	};
};

export const editCommentAction = (postId, commentId, data) => {
	return {
		type: EDIT_COMMENT,
		payload: editCommentService(postId, commentId, data),
	};
};

export const deleteCommentAction = (postId, commentId) => {
	return {
		type: DELETE_COMMENT,
		payload: deleteCommentService(postId, commentId),
	};
};

export const likePostAction = postId => {
	return {
		type: LIKE_POST,
		payload: likePostService(postId),
	};
};

export const countLikeAction = () => {
	return {
		type: COUNT_LIKE,
		payload: countLikeService(),
	};
};

export const unlikePostAction = postId => {
	return {
		type: UNLIKE_POST,
		payload: unlikePostService(postId),
	};
};

export const countUnlikeAction = () => {
	return {
		type: COUNT_UNLIKE,
		payload: countUnlikeService(),
	};
};
