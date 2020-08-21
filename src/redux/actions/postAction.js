import {
	POST,
	VIEW_POSTS,
	OWN_POSTS,
	COMMENT,
	VIEW_COMMENTS,
	ALL_COMMENTS,
} from '../actionType';
import {
	postService,
	viewPostService,
	viewOwnPostService,
	commentService,
	viewCommentService,
	allCommentsService,
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
