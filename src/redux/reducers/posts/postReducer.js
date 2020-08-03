import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { POST } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: {},
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(POST):
			return {
				...state,
				loading: true,
			};
		case fulfilled(POST):
			console.log(action.payload.data.message);
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(POST):
			console.log(action.payload.response.data.message);
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default postReducer;
