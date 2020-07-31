import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';
import loginReducer from './reducers/auth/loginReducer';

const rootReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
});

export default rootReducer;
