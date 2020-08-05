import fetch from '../services/fetchService';

export const postService = data => {
	return fetch.post('/api/posts', data);
};
