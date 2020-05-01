import TYPES from '../reducers/types';

export const clearRedirectTo = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.REDIRECT,
			payload: '',
		});
	};
};
