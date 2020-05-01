import TYPES from './types';

const initialState = {
	article: null,
	articles: [],
	editErrors: {},
};
const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.EDIT_ARTICLE:
			return {
				...state,
				editErrors: {},
			};
		case TYPES.EDIT_ARTICLE_FAIL:
			return {
				...state,
				editErrors: action.payload,
			};
		case TYPES.GET_ARTICLES:
			return {
				...state,
				articles: action.payload,
			};
		case TYPES.GET_ARTICLE:
			return {
				...state,
				article: action.payload,
			};
		default:
			return state;
	}
};

export default articleReducer;
