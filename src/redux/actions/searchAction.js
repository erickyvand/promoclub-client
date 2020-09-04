import { SEARCH } from '../actionType';
import { searchService } from '../../services/searchServise';

export const searchAction = (value, page, limit) => {
	return {
		type: SEARCH,
		payload: searchService(value, page, limit),
	};
};
