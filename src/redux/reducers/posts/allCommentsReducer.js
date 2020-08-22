import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { ALL_COMMENTS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const allCommentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(ALL_COMMENTS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(ALL_COMMENTS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(ALL_COMMENTS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default allCommentsReducer;
