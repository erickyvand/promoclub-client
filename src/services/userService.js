import fetch from './fetchService';

export const profileService = userId => {
	return fetch.get(`/api/auth/profile/${userId}`);
};

export const editProfileService = (userId, data) => {
	return fetch.patch(`/api/auth/edit-profile/${userId}`, data);
};

export const getUsersService = () => {
	return fetch.get('/api/auth/users');
};
