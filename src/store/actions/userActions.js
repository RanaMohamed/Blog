import TYPES from '../reducers/types';
import axios from '../../axios';
import { convertToFormData } from '../../helper';

export const registerUser = (user) => {
	return (dispatch) => {
		axios
			.post('/users/register', user)
			.then((data) => {
				dispatch({
					type: TYPES.REGISTER_USER,
					payload: data.user,
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.REGISTER_USER_FAIL,
					payload: errors,
				});
			});
	};
};

export const registerUserErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.REGISTER_USER_FAIL,
			payload: errors,
		});
	};
};

export const loginUser = (user) => {
	return (dispatch) => {
		axios
			.post('/users/login', user)
			.then((data) => {
				dispatch({
					type: TYPES.LOGIN_USER,
					payload: { user: data.user, token: data.token },
				});
				dispatch({
					type: TYPES.REDIRECT,
					payload: '/',
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.LOGIN_USER_FAIL,
					payload: errors,
				});
			});
	};
};

export const loginUserErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.LOGIN_USER_FAIL,
			payload: errors,
		});
	};
};

export const loadUser = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.LOAD_USER,
		});
	};
};

export const logout = () => {
	delete axios.defaults.headers.common['authorization'];
	return (dispatch) => {
		dispatch({
			type: TYPES.LOGOUT,
		});
	};
};

export const getUser = (token) => {
	axios.defaults.headers.common['authorization'] = token;
	return (dispatch) => {
		axios
			.get('/users/getUser')
			.then((data) => {
				dispatch({
					type: TYPES.GET_USER,
					payload: data.user,
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.LOGOUT,
				});
			});
	};
};

export const editProfile = (user) => {
	return (dispatch) => {
		const fd = convertToFormData(user);
		axios
			.patch('/users', fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((data) => {
				dispatch({
					type: TYPES.EDIT_PROFILE,
					payload: { user: data.user },
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.EDIT_PROFILE_FAIL,
					payload: errors,
				});
			});
	};
};

export const editProfileErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.EDIT_PROFILE_FAIL,
			payload: errors,
		});
	};
};
