import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { LOGIN } from '../../actionType';

const initialState = {
	message: '',
	error: '',
	loading: false,
	redirect: false,
	data: {},
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(LOGIN):
			return {
				...state,
				loading: true,
			};
		case fulfilled(LOGIN):
			console.log(action.payload.data.data);
			return {
				...state,
				loading: false,
        message: action.payload.data.message,
        redirect: true,
				data: action.payload.data.data,
			};
		case rejected(LOGIN):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default loginReducer;
