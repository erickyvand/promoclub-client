import queryString from 'query-string';
import axios from 'axios';

const token = sessionStorage.getItem('token');
export default axios.create({
	baseURL: `${process.env.API_URL}`,
	headers: {
		authorization: `Bearer ${token}`,
		'Access-Control-Allow-Origin': '*',
		contentType: 'application/json',
		accept: 'application/json'
	}
});