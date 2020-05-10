import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
	addArticle,
	editArticleErrors,
	getArticle,
	editArticle,
	removeArticle,
} from '../store/actions/articleActions';
import { url } from '../helper';
import { useParams, useHistory } from 'react-router';

const PostForm = () => {
	const [edited, setEdited] = useState({
		imgUrl: '',
		title: '',
		body: '',
		tags: [],
	});

	const article = useSelector((state) => state.article.article);
	const user = useSelector((state) => state.user.user);
	const [imgUrl, setImgUrl] = useState('');
	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		if (params.id) dispatch(getArticle(params.id));
		else setEdited({ imgUrl: '', title: '', body: '', tags: [] });

		return () => dispatch(removeArticle());
	}, [params.id]);

	useEffect(() => {
		if (article && user) {
			if (article.author._id !== user?._id) history.replace('/');
			const art = { ...article };
			delete art.author;
			delete art.updatedAt;
			setEdited(art);
		}
	}, [article, user]);

	useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgUrl(e.target.result);
		};
		if (typeof edited.imgUrl === 'object') reader.readAsDataURL(edited.imgUrl);
		else
			setImgUrl(edited.imgUrl ? `${url}/${edited.imgUrl}` : 'placeholder.png');
	}, [edited.imgUrl]);

	const errors = useSelector((state) => state.article.editErrors);

	const dispatch = useDispatch();

	const schema = Joi.object({
		title: Joi.string().required().messages({
			'string.empty': 'Name should not be empty',
			'any.required': `Name is required`,
		}),
		body: Joi.string().required().messages({
			'string.empty': 'Body should not be empty',
			'any.required': `Body is required`,
		}),
		tags: Joi.array(),
		_id: Joi.string(),
		imgUrl: Joi.any(),
	});

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const { error } = schema.validate(edited, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			await dispatch(editArticleErrors(err));
			return;
		}
		if (edited._id) {
			await dispatch(editArticle(_.pickBy(edited)));
			history.push(`/article/${article._id}`);
			return;
		}
		await dispatch(addArticle(_.pickBy(edited)));
		history.push(`/`);
	};

	const hanlderAddTag = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const val = e.target.value;
			if (edited.tags.indexOf(val) === -1) {
				setEdited({
					...edited,
					tags: [...edited.tags, val],
				});
				e.target.value = '';
			}
		}
	};

	const hanlderRemoveTag = (val) => {
		const tags = edited.tags.filter((tag) => tag !== val);
		setEdited({
			...edited,
			tags,
		});
	};

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<form onSubmit={handlerSubmit} action='' className='form'>
						<h3 className='text-center underlined underlined--sm'>
							{edited._id ? 'Edit' : 'Add'} Post
						</h3>
						<div className='input-img'>
							<img src={imgUrl} alt='' />
							<input
								type='file'
								name='imgUrl'
								id='imgUrl'
								onChange={(e) =>
									setEdited({ ...edited, imgUrl: e.target.files[0] })
								}
							/>
							<i className='fas fa-camera input-img__icon'></i>
						</div>
						<span className='error-message'>
							{errors['imgUrl']?.message || errors['imgUrl']?.msg}
						</span>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='body'
							className='input'
							placeholder='Title'
							id='title'
							value={edited.title}
							onChange={(e) => {
								setEdited({ ...edited, title: e.target.value });
							}}
						/>
						<span className='error-message'>
							{errors['title']?.message || errors['title']?.msg}
						</span>
						<label htmlFor='body'>Body</label>
						<CKEditor
							editor={ClassicEditor}
							data={edited.body}
							config={{
								toolbar: [
									'heading',
									'|',
									'bold',
									'italic',
									'link',
									'blockQuote',
								],
								link: {
									decorators: {
										addCustomClass: {
											mode: 'automatic',
											callback: (url) => url,
											attributes: {
												class: 'color-link',
											},
										},
									},
								},
							}}
							onChange={(event, editor) => {
								const body = editor.getData();
								setEdited((state) => {
									return { ...state, body };
								});
							}}
						/>
						<span className='error-message'>
							{errors['body']?.message || errors['body']?.msg}
						</span>
						<label htmlFor='tags'>Tags</label>
						<input
							type='text'
							name='tags'
							className='input'
							placeholder='Tags'
							id='tags'
							onKeyDown={hanlderAddTag}
						/>
						<div className='article__tags'>
							{edited.tags.map((tag, index) => (
								<span
									onClick={() => hanlderRemoveTag(tag)}
									key={index}
									className='tag'
								>
									{tag}
								</span>
							))}
						</div>
						<span className='error-message'>
							{errors['tags']?.message || errors['tags']?.msg}
						</span>
						<input type='submit' className='btn' value='Save' />
					</form>
				</div>
			</section>
		</React.Fragment>
	);
};

export default PostForm;