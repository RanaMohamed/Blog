import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { addArticle, editArticleErrors } from '../store/actions/articleActions';
import { url } from '../helper';

const AddPost = () => {
	const [edited, setEdited] = useState({
		imgUrl: '',
		title: '',
		body: '',
		tags: [],
	});
	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgUrl(e.target.result);
		};
		if (typeof edited.imgUrl === 'object') reader.readAsDataURL(edited.imgUrl);
		else
			setImgUrl(edited.imgUrl ? `${url}/${edited.imgUrl}` : 'placeholder.png');
	}, [edited.imgUrl]);

	const errors = useSelector((state) => state.user.editErrors);

	const dispatch = useDispatch();

	const schema = Joi.object({
		title: Joi.string().required().messages({
			'string.empty': 'Name should not be empty',
			'any.required': `Name is required`,
		}),
		body: Joi.string().required().messages({
			'string.empty': 'Password should not be empty',
			'any.required': `Password is required`,
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
			dispatch(editArticleErrors(err));
			return;
		}
		dispatch(addArticle(_.pickBy(edited)));
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
						<h3 className='text-center underlined underlined--sm'>Add Post</h3>
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
							// data='<p>Hello from CKEditor 5!</p>'
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
								setEdited({ ...edited, body });
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

export default AddPost;
