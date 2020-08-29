import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { READ_NOTIFICATION } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: '',
};

const readNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(READ_NOTIFICATION):
			return {
				...state,
				loading: true,
			};
		case fulfilled(READ_NOTIFICATION):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(READ_NOTIFICATION):
			return {
				...state,
				loading: false,
				errror: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default readNotificationReducer;
