import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { SIGNUP } from '../../actionType';

const initialState = {
  message: '',
  error: '',
	loading: false,
	data: {},
};

const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SIGNUP):
			return {
				...state,
				loading: true,
			};
		case fulfilled(SIGNUP):
			return {
				...state,
				message: action.payload.data.message,
				loading: false,
				data: action.payload.data.data,
			};
		case rejected(SIGNUP):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default signupReducer;
