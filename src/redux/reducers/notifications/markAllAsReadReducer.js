import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { MARK_ALL_READ } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
};

const markAllAsReadReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(MARK_ALL_READ):
			return {
				...state,
				loading: true,
			};
		case fulfilled(MARK_ALL_READ):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
			};
		case rejected(MARK_ALL_READ):
			return {
				...state,
				loading: false,
				errror: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default markAllAsReadReducer;
