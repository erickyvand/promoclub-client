import fetch from './fetchService';

export const signupService = data => {
	return fetch.post('/api/auth/signup', data);
};

export const loginService = data => {
	return fetch.post('/api/auth/login', data);
};

export const loginGoogleService = () => {
	return fetch.get('/api/auth/google');
};
