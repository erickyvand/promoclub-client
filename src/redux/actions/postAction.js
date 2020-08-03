import { POST } from '../actionType';
import { postService } from '../../services/postService';

export const postAction = data => {
	return {
		type: POST,
		payload: postService(data),
	};
};
