import {
	NOTIFICATIONS,
	COUNT_NOTIFICATIONS,
	READ_NOTIFICATION,
	MARK_ALL_READ,
} from '../actionType';
import {
	getNotificationService,
	countNotificationsService,
	readNotificationService,
	markAllAsReadService,
} from '../../services/NotificationService';

export const getNotificationAction = (page, limit) => {
	return {
		type: NOTIFICATIONS,
		payload: getNotificationService(page, limit),
	};
};

export const countNotificationsAction = () => {
	return {
		type: COUNT_NOTIFICATIONS,
		payload: countNotificationsService(),
	};
};

export const readNotificationAction = notificationId => {
	return {
		type: READ_NOTIFICATION,
		payload: readNotificationService(notificationId),
	};
};

export const markAllAsReadAction = () => {
	return {
		type: MARK_ALL_READ,
		payload: markAllAsReadService(),
	};
};
