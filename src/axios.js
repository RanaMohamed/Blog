import axios from 'axios';

import toastr from './components/toastr';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
instance.interceptors.response.use(
	(response) => {
		response.data.message && toastr.success(response.data.message);
		return response.data;
	},
	(error) => {
		// if (error.response.status === 404) return;
		toastr.error(
			error.response?.data?.errors ? 'Check your data' : error.message
		);
		if (error.response?.data?.errors?.errors)
			return Promise.reject(error.response.data.errors.errors);

		return Promise.reject({});
	}
);

export default instance;
