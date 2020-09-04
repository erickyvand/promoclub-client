import fetch from './fetchService';

export const searchService = (value, page, limit) => {
	return fetch.get(`/api/search?term=${value}&page=${page}&limit=${limit}`);
};
