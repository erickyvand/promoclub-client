import fetch from '../services/fetchService';

export const postService = data => {
	return fetch.post('/api/posts', data);
};

export const viewPostService = (page, limit) => {
	return fetch.get(`/api/posts?page=${page}&limit=${limit}`);
};
