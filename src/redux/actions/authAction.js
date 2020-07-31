import { SIGNUP, LOGIN } from '../actionType';
import { signupService, loginService } from '../../services/authService';

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

export const loginAction = ({ email, password }) => {
	return {
		type: LOGIN,
		payload: loginService({ email, password }),
	};
};
