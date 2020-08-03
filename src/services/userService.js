import fetch from './fetchService';

export const profileService = userId => {
	return fetch.get(`/api/auth/profile/${userId}`);
};
