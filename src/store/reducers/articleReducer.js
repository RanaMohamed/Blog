import TYPES from './types';

const initialState = {
	article: null,
	articles: [],
	total: 0,
	perPage: 5,
	currentPage: 1,
	errors: {},
};
const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.ADD_ARTICLE_SUCCESS:
		case TYPES.EDIT_ARTICLE_SUCCESS:
			return {
				...state,
				errors: {},
				article: action.payload,
			};
		case TYPES.ADD_ARTICLE_FAILURE:
		case TYPES.EDIT_ARTICLE_FAILURE:
			return {
				...state,
				errors: action.payload,
			};
		case TYPES.GET_ARTICLES_SUCCESS:
			return {
				...state,
				articles: action.payload.articles,
				total: action.payload.total,
			};
		case TYPES.REMOVE_ARTICLES: {
			return {
				...state,
				articles: [],
				total: 0,
				currentPage: 1,
			};
		}
		case TYPES.GET_ARTICLE_SUCCESS:
			return {
				...state,
				article: action.payload,
			};
		case TYPES.REMOVE_ARTICLE: {
			return {
				...state,
				article: null,
			};
		}
		case TYPES.CHANGE_PAGE:
			return {
				...state,
				currentPage: action.payload.page,
				total: action.payload.total,
			};
		case TYPES.RESET_PAGING: {
			return {
				...state,
				currentPage: 1,
				total: 0,
			};
		}
		default:
			return state;
	}
};

export default articleReducer;
