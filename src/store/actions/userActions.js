import TYPES from '../reducers/types';
import axios from '../../axios';

export const registerUser = (user) => {
	return (dispatch) => {
		axios
			.post('/users/register', user)
			.then((data) => {
				dispatch({
					type: TYPES.REGISTER_USER,
					payload: data,
				});
			})
			.catch((err) => {
				dispatch({
					type: TYPES.REGISTER_USER_FAIL,
					payload: err.errors.errors,
				});
			});
	};
};
