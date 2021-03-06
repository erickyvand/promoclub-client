import { pending, fulfilled, rejected } from '../../../helpers/utils';
import { EDIT_PROFILE } from '../../actionType';

const initialState = {
	message: '',
	loading: false,
  error: '',
  data: ''
};

const editPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(EDIT_PROFILE):
			return {
				...state,
				loading: true,
			};
		case fulfilled(EDIT_PROFILE):
			return {
				...state,
				loading: false,
        message: action.payload.data.message,
        data: action.payload.data.data
			};
		case rejected(EDIT_PROFILE):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default editPostReducer;
