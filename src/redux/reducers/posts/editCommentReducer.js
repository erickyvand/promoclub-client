import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { EDIT_COMMENT } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: {},
};

const editCommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(EDIT_COMMENT):
			return {
				...state,
				loading: true,
			};
		case fulfilled(EDIT_COMMENT):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(EDIT_COMMENT):
			return {
				...state,
				loading: false,
				message: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default editCommentReducer;
