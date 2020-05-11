import TYPES from '../reducers/types';
import axios from '../../axios';
import { convertToFormData } from '../../helpers/helper';

export const registerUser = (user) => {
	return async (dispatch) => {
		dispatch({ type: TYPES.REGISTER_USER_REQUEST });
		try {
			const data = await axios.post('/users/register', user);
			dispatch({
				type: TYPES.REGISTER_USER_SUCCESS,
				payload: data.user,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.REGISTER_USER_FAILURE,
				payload: errors,
			});
		}
	};
};

export const registerUserErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.REGISTER_USER_FAILURE,
			payload: errors,
		});
	};
};

export const loginUser = (user) => {
	return async (dispatch) => {
		dispatch({ type: TYPES.LOGIN_USER_REQUEST });
		try {
			const data = await axios.post('/users/login', user);
			axios.defaults.headers.common['authorization'] = data.token;
			dispatch({
				type: TYPES.LOGIN_USER_SUCCESS,
				payload: { user: data.user, token: data.token },
			});
		} catch (errors) {
			dispatch({
				type: TYPES.LOGIN_USER_FAILURE,
				payload: errors,
			});
		}
	};
};

export const loginUserErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.LOGIN_USER_FAILURE,
			payload: errors,
		});
	};
};

export const editProfile = (user) => {
	return async (dispatch) => {
		dispatch({ type: TYPES.EDIT_PROFILE_REQUEST });
		try {
			const fd = convertToFormData(user);
			const data = await axios.patch('/users', fd, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			dispatch({
				type: TYPES.EDIT_PROFILE_SUCCESS,
				payload: { user: data.user },
			});
		} catch (errors) {
			dispatch({
				type: TYPES.EDIT_PROFILE_FAILURE,
				payload: errors,
			});
		}
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

export const loadUser = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.LOAD_USER,
		});
	};
};

export const getUser = (token) => {
	return async (dispatch) => {
		try {
			const data = await axios.get('/users/getUser');
			dispatch({
				type: TYPES.GET_USER,
				payload: data.user,
			});
		} catch (errors) {
			console.log(errors);
		}
	};
};

export const getProfile = (id) => {
	return async (dispatch) => {
		try {
			const data = await axios.get(`/users/getUser/${id}`);
			dispatch({
				type: TYPES.GET_PROFILE,
				payload: data.user,
			});
		} catch (errors) {
			console.log(errors);
		}
	};
};

export const removeProfile = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.GET_PROFILE,
			payload: null,
		});
	};
};

export const followUser = (id, follow) => {
	return async (dispatch) => {
		const data = follow
			? await axios.post(`/users/follow/${id}`)
			: await axios.post(`/users/unfollow/${id}`);
		dispatch({
			type: TYPES.FOLLOW_USER,
			payload: { id, follow },
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
