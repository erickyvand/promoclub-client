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

export const commentService = (postId, data) => {
	return fetch.post(`/api/posts/${postId}/comments`, data);
};

export const viewCommentService = (postId, page, limit) => {
	return fetch.get(`/api/posts/${postId}/comments?page=${page}&limit=${limit}`);
};

export const allCommentsService = () => {
	return fetch.get('api/posts/comments');
};
