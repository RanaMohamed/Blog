const initialState = {
	pending: false,
};

const requestReducer = (state = initialState, action) => {
	if (action.type.endsWith('REQUEST')) {
		return {
			...state,
			pending: true,
		};
	}
	if (action.type.endsWith('SUCCESS') || action.type.endsWith('FAILURE')) {
		return {
			...state,
			pending: false,
		};
	}
	return state;
};

export default requestReducer;
