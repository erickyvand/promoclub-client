import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { PROFILE } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
	data: {},
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(PROFILE):
			return {
				...state,
				loading: true,
			};
		case fulfilled(PROFILE):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(PROFILE):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default profileReducer;
