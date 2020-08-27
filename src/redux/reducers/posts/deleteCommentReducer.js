import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { DELETE_COMMENT } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: '',
};

const deleteCommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(DELETE_COMMENT):
			return {
				...state,
				loading: true,
			};
		case fulfilled(DELETE_COMMENT):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(DELETE_COMMENT):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default deleteCommentReducer;
