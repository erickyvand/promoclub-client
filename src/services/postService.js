import fetch from '../services/fetchService';

export const postService = data => {
	return fetch.post('/api/posts', data);
};

export const viewPostService = (page, limit) => {
	return fetch.get(`/api/posts?page=${page}&limit=${limit}`);
};

export const viewOwnPostService = (userId, page, limit) => {
	return fetch.get(`/api/posts/view/${userId}?page=${page}&limit=${limit}`);
};

export const countOwnPostsService = userId => {
	return fetch.get(`/api/posts/count/${userId}`);
};

export const singlePostService = postId => {
	return fetch.get(`/api/posts/${postId}/post`);
};

export const editPostService = (postId, data) => {
	return fetch.patch(`/api/posts/${postId}/edit`, data);
};

export const deletePostService = postId => {
	return fetch.delete(`/api/posts/${postId}/delete`);
};

export const commentService = (postId, data) => {
	return fetch.post(`/api/posts/${postId}/comments`, data);
};

export const viewCommentService = (postId, page, limit) => {
	return fetch.get(`/api/posts/${postId}/comments?page=${page}&limit=${limit}`);
};

export const allCommentsService = () => {
	return fetch.get('/api/posts/comments');
};

export const editCommentService = (postId, commentId, data) => {
	return fetch.patch(`/api/posts/${postId}/comments/${commentId}/edit`, data);
};

export const deleteCommentService = (postId, commentId) => {
	return fetch.delete(`/api/posts/${postId}/comments/${commentId}/delete`);
};

export const likePostService = postId => {
	return fetch.patch(`/api/posts/${postId}/like`);
};

export const countLikeService = () => {
	return fetch.get(`/api/posts/likes`);
};

export const unlikePostService = postId => {
	return fetch.patch(`/api/posts/${postId}/unlike`);
};

export const countUnlikeService = () => {
	return fetch.get(`/api/posts/unlikes`);
};
