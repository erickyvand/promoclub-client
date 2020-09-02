import fetch from '../services/fetchService';

export const getNotificationService = (page, limit) => {
	return fetch.get(`/api/notifications?page=${page}&limit=${limit}`);
};

export const countNotificationsService = () => {
	return fetch.get(`/api/notifications/count`);
};

export const readNotificationService = notificationId => {
	return fetch.patch(`/api/notifications/${notificationId}/read`);
};

export const markAllAsReadService = () => {
	return fetch.patch('/api/notifications/mark-as-read');
};
