import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { LIKE_POST } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
};

const likePostReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(LIKE_POST):
			return {
				...state,
				loading: true,
			};
		case fulfilled(LIKE_POST):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
			};
		case rejected(LIKE_POST):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default likePostReducer;
