import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { OWN_POSTS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const viewOwnPotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(OWN_POSTS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(OWN_POSTS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(OWN_POSTS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default viewOwnPotsReducer;
