import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';
import loginReducer from './reducers/auth/loginReducer';
import searchAccountReducer from './reducers/auth/searchAccountReducer';
import resetPasswordReducer from './reducers/auth/resetPasswordReducer';
import postReducer from './reducers/posts/postReducer';
import viewPostsReducer from './reducers/posts/viewPostsReducer';
import profileReducer from './reducers/users/profileReducer';
import editProfileReducer from './reducers/users/editProfileReducer';
import viewOwnPotsReducer from './reducers/posts/ownPostsReducer';
import commentReducer from './reducers/posts/commentReducer';
import viewCommentReducer from './reducers/posts/viewCommentReducer';
import allCommentsReducer from './reducers/posts/allCommentsReducer';

const rootReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	searchAccount: searchAccountReducer,
	resetPassword: resetPasswordReducer,
	postReducer,
	viewPosts: viewPostsReducer,
	profile: profileReducer,
	editProfile: editProfileReducer,
	ownPosts: viewOwnPotsReducer,
	comment: commentReducer,
	viewComments: viewCommentReducer,
	allComments: allCommentsReducer,
});

export default rootReducer;
