import { SIGNUP, LOGIN, SEARCH_ACCOUNT, RESET_PASSWORD } from '../actionType';
import {
	signupService,
	loginService,
	searchAccountService,
	resetPasswordService,
} from '../../services/authService';

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

export const searchAccountAction = email => {
	return {
		type: SEARCH_ACCOUNT,
		payload: searchAccountService(email),
	};
};

export const resetPasswordAction = ({ password, confirmPassword }) => {
	return {
		type: RESET_PASSWORD,
		payload: resetPasswordService({ password, confirmPassword }),
	};
};
