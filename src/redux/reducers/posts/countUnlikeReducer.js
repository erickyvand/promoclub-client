import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { COUNT_UNLIKE } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
  error: '',
  data: ''
};

const countUnlikeReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(COUNT_UNLIKE):
			return {
				...state,
				loading: true,
			};
		case fulfilled(COUNT_UNLIKE):
			return {
				...state,
				loading: false,
				message: action.payload.data.message,
				data: action.payload.data.data,
			};
		case rejected(COUNT_UNLIKE):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default countUnlikeReducer;
