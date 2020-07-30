import fetch from './fetchService';

export const signupService = data => {
	return fetch.post('/api/auth/signup', data);
};
