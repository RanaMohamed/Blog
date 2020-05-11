import TYPES from './types';

const initialState = {
	user: null,
	loaded: false,
	profile: null,
	token: '',
	errors: {},
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.REGISTER_USER_SUCCESS:
			return {
				...state,
				errors: {},
			};
		case TYPES.LOGIN_USER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				errors: {},
			};
		case TYPES.EDIT_PROFILE_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				errors: {},
			};
		}
		case TYPES.REGISTER_USER_FAILURE:
		case TYPES.LOGIN_USER_FAILURE:
		case TYPES.EDIT_PROFILE_FAILURE: {
			return {
				...state,
				errors: action.payload,
			};
		}
		case TYPES.LOAD_USER: {
			return {
				...state,
				token: localStorage.getItem('token'),
				loaded: true,
			};
		}
		case TYPES.GET_USER: {
			return {
				...state,
				user: action.payload,
			};
		}
		case TYPES.GET_PROFILE: {
			return {
				...state,
				profile: action.payload,
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
		case TYPES.FOLLOW_USER: {
			const user = { ...state.user };
			action.payload.follow
				? (user.following = [...user.following, action.payload.id])
				: (user.following = user.following.map((u) => u !== action.payload.id));
			return {
				...state,
				user,
			};
		}
		default:
			return state;
	}
};

export default userReducer;
