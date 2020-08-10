import { PROFILE } from '../actionType';
import { profileService } from '../../services/userService';

export const profileAction = userId => {
	return {
		type: PROFILE,
		payload: profileService(userId),
	};
};
