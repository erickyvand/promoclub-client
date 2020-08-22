import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { VIEW_COMMENTS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const viewCommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(VIEW_COMMENTS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(VIEW_COMMENTS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(VIEW_COMMENTS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default viewCommentReducer;
