import fetch from './fetchService';
import fetchQuery from './queryService';

export const signupService = data => {
	return fetch.post('/api/auth/signup', data);
};

export const loginService = data => {
	return fetch.post('/api/auth/login', data);
};

export const searchAccountService = data => {
	return fetch.post('/api/auth/search-account', data);
};

export const resetPasswordService = data => {
	return fetchQuery.patch('/api/auth/reset-password', data);
};
