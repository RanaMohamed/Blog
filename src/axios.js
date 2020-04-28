import axios from 'axios';

import toastr from './components/toastr';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
instance.interceptors.response.use(
	(response) => {
		toastr.success(response.data.message);
		return response.data;
	},
	(error) => {
		toastr.error(
			error.response?.data?.errors ? 'Check your data' : error.message
		);
		if (error.response?.data?.errors)
			return Promise.reject(error.response.data.errors.errors);

		return Promise.reject({});
	}
);

export default instance;
