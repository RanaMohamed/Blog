import axios from 'axios';

import toastr from './components/toastr';
import store from './store/store';
import { logout } from './store/actions/userActions';
const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const token = localStorage.getItem('token');
if (token) instance.defaults.headers.common['authorization'] = token;

instance.interceptors.response.use(
	(response) => {
		if (response.status === 201)
			response.data.message && toastr.success(response.data.message);
		return response.data;
	},
	(error) => {
		if (error.response?.status === 401) {
			store.dispatch(logout());
		} else {
			toastr.error(
				error.response?.data?.errors
					? 'Check your data'
					: error.response?.data?.message
					? error.response.data.message
					: error.message
			);
		}
		if (error.response?.data?.errors?.errors)
			return Promise.reject(error.response.data.errors.errors);

		return Promise.reject({});
	}
);

export default instance;
