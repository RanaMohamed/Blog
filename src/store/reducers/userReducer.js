import TYPES from './types';

const initialState = {
	user: {},
	errors: {},
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.REGISTER_USER:
			return {
				...state,
				user: action.payload,
				errors: {},
			};
		case TYPES.REGISTER_USER_FAIL:
			return {
				...state,
				errors: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
