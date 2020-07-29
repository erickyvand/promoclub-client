import { SIGNUP } from '../actionType';
import { signupService } from '../../services/authService';

export const signupAction = ({
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
}) => {
	return {
		type: SIGNUP,
		payload: signupService({
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		}),
	};
};
