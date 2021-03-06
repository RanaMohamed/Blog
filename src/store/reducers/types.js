// const createTypes = (actionName) => {
// 	const types = ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
// 		return { ...acc, [`${actionName}_${type}`]: `${actionName}_${type}` };
// 	}, {});
// 	return types;
// };
// const ADD_ARTICLE = createTypes('ADD_ARTICLE');
// const GET_ARTICLES = createTypes('GET_ARTICLES');

const TYPES = {
	REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST',
	REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
	REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',

	LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
	LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
	LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
	LOGOUT: 'LOGOUT',

	LOAD_USER: 'LOAD_USER',
	GET_USER: 'GET_USER',
	GET_PROFILE: 'GET_PROFILE',
	FOLLOW_USER: 'FOLLOW_USER',

	EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST',
	EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
	EDIT_PROFILE_FAILURE: 'EDIT_PROFILE_FAILURE',

	ADD_ARTICLE_REQUEST: 'ADD_ARTICLE_REQUEST',
	ADD_ARTICLE_SUCCESS: 'ADD_ARTICLE_SUCCESS',
	ADD_ARTICLE_FAILURE: 'ADD_ARTICLE_FAILURE',

	GET_ARTICLES_REQUEST: 'GET_ARTICLES_REQUEST',
	GET_ARTICLES_SUCCESS: 'GET_ARTICLES_SUCCESS',
	GET_ARTICLES_FAILURE: 'GET_ARTICLES_FAILURE',
	REMOVE_ARTICLES: 'REMOVE_ARTICLES',

	GET_ARTICLE_REQUEST: 'GET_ARTICLE_REQUEST',
	GET_ARTICLE_SUCCESS: 'GET_ARTICLE_SUCCESS',
	GET_ARTICLE_FAILURE: 'GET_ARTICLE_FAILURE',
	REMOVE_ARTICLE: 'REMOVE_ARTICLE',

	EDIT_ARTICLE_REQUEST: 'EDIT_ARTICLE_REQUEST',
	EDIT_ARTICLE_SUCCESS: 'EDIT_ARTICLE_SUCCESS',
	EDIT_ARTICLE_FAILURE: 'EDIT_ARTICLE_FAILURE',

	CHANGE_PAGE: 'CHANGE_PAGE',
	RESET_PAGING: 'RESET_PAGING',
};

export default TYPES;
