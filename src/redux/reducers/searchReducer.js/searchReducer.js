import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { SEARCH } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SEARCH):
			return {
				...state,
				loading: true,
			};
		case fulfilled(SEARCH):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(SEARCH):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default searchReducer;
