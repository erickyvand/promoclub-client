import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { DELETE_POST } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
};

const deletePostReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(DELETE_POST):
			return {
				...state,
				loading: true,
			};
		case fulfilled(DELETE_POST):
			return {
				...state,
				loading: false,
				message: Math.random(),
			};
		case rejected(DELETE_POST):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default deletePostReducer;
