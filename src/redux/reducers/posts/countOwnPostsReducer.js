import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { COUNT_OWN_POSTS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const countOwnPostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(COUNT_OWN_POSTS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(COUNT_OWN_POSTS):
			return {
				...state,
				loading: false,
				message: Math.random(),
				data: action.payload.data.data,
			};
		case rejected(COUNT_OWN_POSTS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default countOwnPostsReducer;
