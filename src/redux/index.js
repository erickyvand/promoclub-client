import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';
import loginReducer from './reducers/auth/loginReducer';
import searchAccountReducer from './reducers/auth/searchAccountReducer';
import resetPasswordReducer from './reducers/auth/resetPasswordReducer';

const rootReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	searchAccount: searchAccountReducer,
	resetPassword: resetPasswordReducer,
});

export default rootReducer;
