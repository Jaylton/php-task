/**
 * Api Requests Helper
 */
import AuthService from "../services/AuthService";

/**
 * Axios object
 */
const axios = require('axios')

/**
 * Request types
 */
export const RequestType = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

/**
 * Api class
 */
class Api {

	/**
	 * Request executor
	 *
	 * @param {string} type Request type
	 * @param {string} url Request url
	 * @param {array} data Request data
	 *
	 * @returns {Promise<any>}
	 */
	makeRequest(type, url, data = null) {

		// transform data object into string as axios doesn't work well with objects via get
		if (data && typeof data === 'object') {
			url += '?' + Object.keys(data).map(key => key + '=' + data[key]).join('&');
			data = null;
		}

		// attaches the request data to the url in case of a string GET request
		if (type === RequestType.GET && typeof data === 'string') {
			url += '?' + data;
			data = null;
		}

		const token = AuthService.getToken(); // put the token in requests
		let auth = {}
		if (token) {
			auth = {
				"Authorization": 'Bearer ' + token,
			}
		}

		return axios({
			url: url,
			method: type,
			headers: {
				'Content-type': 'application/json',
				'Accept-Language': 'en',
				...auth
			}
		})
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error.response.status === 401) {
					localStorage.removeItem('accessToken');
					window.location.href = '/login';
				}
				return error.response
			});
	}

	/**
	 * Request executor
	 *
	 * @param {string} type Request type
	 * @param {string} url Request url
	 * @param {array} data Request data
	 *
	 * @returns {Promise<any>}
	 */
	makeFormRequest(type, url, data = null, isFile = false) {

		const token = AuthService.getToken(); // put the token in requests
		let auth = {}
		if (token) {
			auth = {
				"Authorization": 'Bearer ' + token,
			}
		}

		return axios({
			url: url,
			method: type,
			data: isFile ? data : JSON.stringify(data),
			headers: {
				'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
				'Accept-Language': 'en',
				...auth
			}
		})
			.then(response => {
				return response;
			})
			.catch(error => {
				if (error.response.status === 401) {
					localStorage.removeItem('accessToken');
					window.location.href = '/login';
				}
				return error.response;
			});

	}

	/**
	 * GET request executor
	 *
	 * @param {string} url Request url
	 * @param {array} data Request data
	 *
	 * @returns {Promise<any>}
	 */
	get(url, data) {
		return this.makeRequest(RequestType.GET, url, data);
	}

	/**
	 * POST request executor
	 *
	 * @param {string} url Request url
	 * @param {array} data Request data
	 *
	 * @returns {Promise<any>}
	 */
	post(url, data, isFile = false) {
		return this.makeFormRequest(RequestType.POST, url, data, isFile);
	}

	/**
	 * DELETE request executor
	 *
	 * @param {string} url Request url
	 * @param {array} data Data to inform the delete
	 *
	 * @returns {Promise<any>}
	 */
	delete(url, data) {
		return this.makeFormRequest(RequestType.DELETE, url, data);
	}

}

export const api = new Api();
