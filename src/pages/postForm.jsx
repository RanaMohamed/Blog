import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import * as _ from 'lodash';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { postSchema } from '../helpers/schemas';

import {
	addArticle,
	editArticleErrors,
	getArticle,
	editArticle,
	removeArticle,
} from '../store/actions/articleActions';

const PostForm = () => {
	const pending = useSelector((state) => state.request.pending);
	const article = useSelector((state) => state.article.article);
	const user = useSelector((state) => state.user.user);
	const errors = useSelector((state) => state.article.errors);

	const classes = pending ? 'form block blocked' : 'form block';

	const params = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const defaultArticle = { imgUrl: '', title: '', body: '', tags: [] };

	const [edited, setEdited] = useState(defaultArticle);
	const [submitted, setSubmitted] = useState(false);
	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		if (params.id) dispatch(getArticle(params.id));
		else setEdited(defaultArticle);

		return () => dispatch(removeArticle());
	}, [params.id]);

	useEffect(() => {
		if (article && user) {
			//todo check if user owns the post

			if (submitted && !pending && _.isEmpty(errors))
				history.push(`/article/${article._id}`);

			setEdited(_.omit(article, ['author', 'updatedAt']));
		}
	}, [article]);

	useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgUrl(e.target.result);
		};
		if (typeof edited.imgUrl === 'object') reader.readAsDataURL(edited.imgUrl);
		else setImgUrl(edited.imgUrl ? edited.imgUrl : 'placeholder.png');
	}, [edited.imgUrl]);

	const handleSubmit = async (e) => {
		setSubmitted(true);
		e.preventDefault();
		const { error } = postSchema.validate(edited, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(editArticleErrors(err));
			return;
		}
		if (edited._id) {
			dispatch(editArticle(_.pickBy(edited)));
			return;
		}
		dispatch(addArticle(_.pickBy(edited)));
	};

	const handleTagAdd = (e) => {
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

	const handleTagRemove = (val) => {
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
					<form onSubmit={handleSubmit} action='' className={classes}>
						<div className='loader'></div>
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
							onKeyDown={handleTagAdd}
						/>
						<div className='article__tags'>
							{edited.tags.map((tag, index) => (
								<span
									onClick={() => handleTagRemove(tag)}
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
