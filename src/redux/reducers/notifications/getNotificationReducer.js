import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { NOTIFICATIONS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const getNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(NOTIFICATIONS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(NOTIFICATIONS):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(NOTIFICATIONS):
			return {
				...state,
				loading: false,
				errror: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default getNotificationReducer;
