import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { SEARCH_ACCOUNT } from '../../actionType';

const initialState = {
	loading: false,
	message: '',
	error: '',
};

const searchAccountReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SEARCH_ACCOUNT):
			return {
				...state,
				loading: true,
			};
		case fulfilled(SEARCH_ACCOUNT):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
			};
		case rejected(SEARCH_ACCOUNT):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default searchAccountReducer;
