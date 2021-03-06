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
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(POST):
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
