import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { COUNT_NOTIFICATIONS } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: [],
};

const countNotificationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(COUNT_NOTIFICATIONS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(COUNT_NOTIFICATIONS):
			return {
				...state,
				loading: false,
				message: Math.random(),
				data: action.payload.data.data,
			};
		case rejected(COUNT_NOTIFICATIONS):
			return {
				...state,
				loading: false,
				errror: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default countNotificationsReducer;
