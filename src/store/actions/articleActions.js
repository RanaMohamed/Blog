import TYPES from '../reducers/types';
import axios from '../../axios';
import { convertToFormData } from '../../helper';

export const addArticle = (article) => {
	const fd = convertToFormData(article);
	return (dispatch) => {
		axios
			.post('/articles', fd)
			.then((data) => {
				dispatch({
					type: TYPES.EDIT_ARTICLE,
					payload: data.article,
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.EDIT_ARTICLE_FAIL,
					payload: errors,
				});
			});
	};
};

export const editArticle = (article) => {
	return (dispatch) => {
		const fd = convertToFormData(article);
		axios
			.patch('/articles', fd)
			.then((data) => {
				dispatch({
					type: TYPES.EDIT_ARTICLE,
					payload: data.article,
				});
			})
			.catch((errors) => {
				dispatch({
					type: TYPES.EDIT_ARTICLE_FAIL,
					payload: errors,
				});
			});
	};
};

export const editArticleErrors = (errors) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.EDIT_ARTICLE_FAIL,
			payload: errors,
		});
	};
};

export const getArticles = (page, userId, query) => {
	return (dispatch) => {
		axios
			.get(`/articles?page=${page}`, {
				params: {
					userId: userId,
					q: query,
				},
			})
			.then((data) => {
				dispatch({
					type: TYPES.GET_ARTICLES,
					payload: data,
				});
			})
			.catch((errors) => {});
	};
};

export const getArticle = (id) => {
	return (dispatch) => {
		axios
			.get(`/articles/${id}`)
			.then((data) => {
				dispatch({
					type: TYPES.GET_ARTICLE,
					payload: data.article,
				});
			})
			.catch((errors) => {});
	};
};

export const removeArticle = () => {
	return (dispatch) => {
		dispatch({
			type: TYPES.GET_ARTICLE,
			payload: null,
		});
	};
};

export const deleteArticle = (id) => {
	return (dispatch) => {
		axios
			.delete(`/articles/${id}`)
			.then((data) => {})
			.catch((errors) => {});
	};
};

export const changePage = (page, total) => {
	return (dispatch) => {
		dispatch({
			type: TYPES.CHANGE_PAGE,
			payload: { page, total },
		});
	};
};
