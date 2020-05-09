import TYPES from './types';

const initialState = {
	article: null,
	articles: [],
	total: 0,
	perPage: 5,
	currentPage: 1,
	editErrors: {},
};
const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.EDIT_ARTICLE:
			return {
				...state,
				editErrors: {},
				article: action.payload,
			};
		case TYPES.EDIT_ARTICLE_FAIL:
			return {
				...state,
				editErrors: action.payload,
			};
		case TYPES.GET_ARTICLES:
			return {
				...state,
				articles: action.payload.articles,
				total: action.payload.total,
			};
		case TYPES.GET_ARTICLE:
			return {
				...state,
				article: action.payload,
			};
		case TYPES.CHANGE_PAGE:
			return {
				...state,
				currentPage: action.payload.page,
				total: action.payload.total === 0 ? 0 : state.total,
			};
		default:
			return state;
	}
};

export default articleReducer;
