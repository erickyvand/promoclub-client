import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { RESET_PASSWORD } from '../../actionType';

const initialState = {
	loading: false,
	message: '',
	error: '',
};

const resetPasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(RESET_PASSWORD):
			return {
				...state,
				loading: true,
			};
		case fulfilled(RESET_PASSWORD):
			return {
        ...state,
        loading: false,
				message: action.payload.data.message,
			};
		case rejected(RESET_PASSWORD):
			return {
        ...state,
        loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default resetPasswordReducer;
