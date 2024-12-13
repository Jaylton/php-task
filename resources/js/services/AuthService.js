import { api } from '../utilities/api';

class AuthService {

	login = params => {
		return api.post('/api/login', params).then(result => result);
	}

	register = params => {
		return api.post('/api/register', params).then(result => result);
	}

	getToken = () => {
		return localStorage.getItem('accessToken');
	}

	forgotPassword = email => {
		return api.post('/api/forgot-password', { email }).then(result => result);
	}

	resetPassword = params => {
		return api.post('/api/reset-password', params).then(result => result);
	}

	logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('user');
		window.location.href = '/login';
	}

}

export default new AuthService();
