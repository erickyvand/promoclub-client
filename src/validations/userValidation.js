import * as yup from 'yup';

export const signupSchema = yup.object({
	firstName: yup
		.string()
		.min(2, 'First Name must be at least 2 characters')
		.trim()
		.required(),
	lastName: yup
		.string()
		.min(2, 'Last Name must be at least 2 characters')
		.required(),
	email: yup.string().required().email('Email must be a valid email'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});
