import { POST, VIEW_POSTS, OWN_POSTS, COMMENT } from '../actionType';
import {
	postService,
	viewPostService,
	viewOwnPostService,
	commentService,
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
