import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { COMMENT } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
	error: '',
};

const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(COMMENT):
			return {
				...state,
				loading: true,
			};
		case fulfilled(COMMENT):
			console.log(action.payload.data.message);
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
			};
		case rejected(COMMENT):
			console.log(action.payload.response.data.message);
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return false;
	}
};

export default commentReducer;
