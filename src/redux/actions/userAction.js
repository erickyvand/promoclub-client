import { PROFILE, EDIT_PROFILE } from '../actionType';
import { profileService, editProfileService } from '../../services/userService';

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
