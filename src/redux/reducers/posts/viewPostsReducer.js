import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { VIEW_POSTS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const viewPostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(VIEW_POSTS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(VIEW_POSTS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected():
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default viewPostsReducer;
