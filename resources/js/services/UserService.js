import { api } from '../utilities/api';

class UserService {

	getUsers = params => {
		return api.get('/api/users', params).then(result => result);
	}

	getUser = () => {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	}

}

export default new UserService();
