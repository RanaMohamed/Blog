import TYPES from './types';

const initialState = {
	redirectTo: '',
};
const routeReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.REDIRECT:
			return {
				...state,
				redirectTo: action.payload,
			};
		default:
			return state;
	}
};

export default routeReducer;
