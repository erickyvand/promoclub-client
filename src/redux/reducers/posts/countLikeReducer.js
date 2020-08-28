import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { COUNT_LIKE } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
  error: '',
  data: ''
};

const countLikeReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(COUNT_LIKE):
			return {
				...state,
				loading: true,
			};
		case fulfilled(COUNT_LIKE):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(COUNT_LIKE):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default countLikeReducer;
