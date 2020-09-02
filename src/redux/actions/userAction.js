import { PROFILE, EDIT_PROFILE, ALL_USERS } from '../actionType';
import {
	profileService,
	editProfileService,
	getUsersService,
} from '../../services/userService';

export const profileAction = userId => {
	return {
		type: PROFILE,
		payload: profileService(userId),
	};
};

export const editProfileAction = (userId, data) => {
	return {
		type: EDIT_PROFILE,
		payload: editProfileService(userId, data),
	};
};

export const getUsersAction = () => {
	return {
		type: ALL_USERS,
		payload: getUsersService(),
	};
};
