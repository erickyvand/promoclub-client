import React from 'react';
import queryString from 'query-string';
import JwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

const Oauth = () => {
	const { token } = queryString.parse(location.search);
	const decoded = JwtDecode(token);

	sessionStorage.setItem('id', decoded.id);
	sessionStorage.setItem('firstName', decoded.firstName);
	sessionStorage.setItem('lastName', decoded.lastName);
	sessionStorage.setItem('profilePicture', decoded.profilePicture);
	sessionStorage.setItem('role', decoded.role);
	sessionStorage.setItem('token', token);
	// return <Redirect to='/feed' />;
	location.replace('/feed');
};

export default Oauth;
