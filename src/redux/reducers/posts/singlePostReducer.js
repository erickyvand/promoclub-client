import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { SINGLE_POST } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: {},
};

const singlePostReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SINGLE_POST):
			return {
				...state,
				loading: true,
			};
		case fulfilled(SINGLE_POST):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(SINGLE_POST):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default singlePostReducer;
