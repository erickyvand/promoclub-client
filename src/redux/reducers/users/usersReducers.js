import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { ALL_USERS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(ALL_USERS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(ALL_USERS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(ALL_USERS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default usersReducer;
