import TYPES from './types';

const initialState = {
	user: null,
	token: '',
	loginErrors: {},
	registerErrors: {},
	editErrors: {},
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.REGISTER_USER:
			return {
				...state,
				registerErrors: {},
			};
		case TYPES.REGISTER_USER_FAIL:
			return {
				...state,
				registerErrors: action.payload,
			};
		case TYPES.LOGIN_USER:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loginErrors: {},
			};
		case TYPES.LOGIN_USER_FAIL:
			return {
				...state,
				loginErrors: action.payload,
			};
		case TYPES.LOAD_USER: {
			return {
				...state,
				token: localStorage.getItem('token'),
			};
		}
		case TYPES.GET_USER: {
			return {
				...state,
				user: action.payload,
			};
		}
		case TYPES.LOGOUT: {
			localStorage.removeItem('token');
			return {
				...state,
				user: null,
				token: null,
			};
		}
		case TYPES.EDIT_PROFILE: {
			return {
				...state,
				user: action.payload.user,
				editErrors: {},
			};
		}
		case TYPES.EDIT_PROFILE_FAIL: {
			return {
				...state,
				editErrors: action.payload,
			};
		}
		default:
			return state;
	}
};

export default userReducer;
