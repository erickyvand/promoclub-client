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
import editPostReducer from './reducers/posts/editPostReducer';
import deletePostReducer from './reducers/posts/deletePostReducer';
import editCommentReducer from './reducers/posts/editCommentReducer';
import deleteCommentReducer from './reducers/posts/deleteCommentReducer';
import likePostReducer from './reducers/posts/likePostReducer';
import countLikeReducer from './reducers/posts/countLikeReducer';
import unlikePostReducer from './reducers/posts/unlikePostReducer';
import countUnlikeReducer from './reducers/posts/countUnlikeReducer';
import getNotificationReducer from './reducers/notifications/getNotificationReducer';
import usersReducer from './reducers/users/usersReducers';
import countNotificationsReducer from './reducers/notifications/countNotificationsReducer';
import readNotificationReducer from './reducers/notifications/readNotificationReducer';
import countOwnPostsReducer from './reducers/posts/countOwnPostsReducer';
import singlePostReducer from './reducers/posts/singlePostReducer';
import markAllAsReadReducer from './reducers/notifications/markAllAsReadReducer';

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
	editPost: editPostReducer,
	deletePost: deletePostReducer,
	editComment: editCommentReducer,
	deleteComment: deleteCommentReducer,
	likePost: likePostReducer,
	countLike: countLikeReducer,
	unlikePost: unlikePostReducer,
	countUnlike: countUnlikeReducer,
	notifications: getNotificationReducer,
	users: usersReducer,
	countNotifications: countNotificationsReducer,
	readNotification: readNotificationReducer,
	countOwnPosts: countOwnPostsReducer,
	singlePost: singlePostReducer,
	markAll: markAllAsReadReducer,
});

export default rootReducer;
