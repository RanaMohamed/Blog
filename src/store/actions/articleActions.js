import TYPES from '../reducers/types';
import axios from '../../axios';
import { convertToFormData } from '../../helpers/helper';
import store from '../store';

export const addArticle = (article) => {
	return async (dispatch) => {
		const fd = convertToFormData(article);
		dispatch({ type: TYPES.ADD_ARTICLE_REQUEST });
		try {
			const data = await axios.post('/articles', fd);
			dispatch({
				type: TYPES.ADD_ARTICLE_SUCCESS,
				payload: data.article,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.ADD_ARTICLE_FAILURE,
				payload: errors,
			});
		}
	};
};

export const getArticles = (userId, query) => {
	return async (dispatch) => {
		const page = store.getState().article.currentPage;
		dispatch({ type: TYPES.GET_ARTICLES_REQUEST });
		try {
			const data = await axios.get(`/articles?page=${page}`, {
				params: { userId: userId, q: query },
			});
			dispatch({
				type: TYPES.GET_ARTICLES_SUCCESS,
				payload: data,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.GET_ARTICLES_FAILURE,
				payload: errors,
			});
		}
	};
};

export const getFollowed = (userId, query) => {
	return async (dispatch) => {
		const page = store.getState().article.currentPage;
		try {
			dispatch({ type: TYPES.GET_ARTICLES_REQUEST });
			const data = await axios.get(`/articles/followed?page=${page}`);
			dispatch({
				type: TYPES.GET_ARTICLES_SUCCESS,
				payload: data,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.GET_ARTICLES_FAILURE,
				payload: errors,
			});
		}
	};
};

export const removeArticles = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.REMOVE_ARTICLES,
		});
	};
};

export const getArticle = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: TYPES.GET_ARTICLE_REQUEST });
			const data = await axios.get(`/articles/${id}`);
			dispatch({
				type: TYPES.GET_ARTICLE_SUCCESS,
				payload: data.article,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.GET_ARTICLE_FAILURE,
			});
		}
	};
};

export const removeArticle = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.REMOVE_ARTICLE,
		});
	};
};

export const editArticle = (article) => {
	return async (dispatch) => {
		const fd = convertToFormData(article);
		dispatch({ type: TYPES.EDIT_ARTICLE_REQUEST });
		try {
			const data = await axios.patch('/articles', fd);
			dispatch({
				type: TYPES.EDIT_ARTICLE_SUCCESS,
				payload: data.article,
			});
		} catch (errors) {
			dispatch({
				type: TYPES.EDIT_ARTICLE_FAILURE,
				payload: errors,
			});
		}
	};
};

export const editArticleErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.EDIT_ARTICLE_FAILURE,
			payload: errors,
		});
	};
};

export const deleteArticle = (id) => {
	return axios.delete(`/articles/${id}`);
};

export const changePage = (page, total) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.CHANGE_PAGE,
			payload: { page, total },
		});
	};
};
