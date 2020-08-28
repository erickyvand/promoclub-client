import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { UNLIKE_POST } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
};

const unlikePostReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(UNLIKE_POST):
			return {
				...state,
				loading: true,
			};
		case fulfilled(UNLIKE_POST):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
			};
		case rejected(UNLIKE_POST):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default unlikePostReducer;
