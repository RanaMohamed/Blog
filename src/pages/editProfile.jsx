import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';

import { editProfile, editProfileErrors } from '../store/actions/userActions';
import { emailRegex, url } from '../helper';

const EditProfile = () => {
	const user = useSelector((state) => state.user.user);
	const [imgUrl, setImgUrl] = useState('');
	const [edited, setEdited] = useState({
		imgUrl: '',
		name: '',
		email: '',
		desc: '',
		password: '',
	});

	useEffect(() => {
		if (user) setEdited({ ...edited, ...user });
	}, [user]);

	useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgUrl(e.target.result);
		};
		if (typeof edited.imgUrl === 'object') reader.readAsDataURL(edited.imgUrl);
		else setImgUrl(edited.imgUrl ? url + '/' + edited.imgUrl : '');
	}, [edited.imgUrl]);

	const errors = useSelector((state) => state.user.editErrors);
	const dispatch = useDispatch();

	const schema = Joi.object({
		name: Joi.string().required().messages({
			'string.empty': 'Name should not be empty',
			'any.required': `Name is required`,
		}),
		email: Joi.string().required().pattern(emailRegex).messages({
			'string.pattern.base': 'Email is invalid',
			'string.empty': 'Email should not be empty',
			'any.required': `Email is required`,
		}),
		password: Joi.string().min(8).messages({
			'string.empty': 'Password should not be empty',
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is required`,
		}),
		_id: Joi.string(),
		desc: Joi.string(),
		imgUrl: Joi.any(),
	});

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const { error } = schema.validate(user, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(editProfileErrors(err));
			return;
		}
		dispatch(editProfile(_.pickBy(edited)));
	};

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<form onSubmit={handlerSubmit} action='' className='form'>
						<h3 className='text-center underlined underlined--sm'>
							Edit Profile
						</h3>
						<div className='input-img input-img--avatar'>
							<img src={imgUrl} alt='' />
							<input
								type='file'
								name=''
								id=''
								onChange={(e) =>
									setEdited({ ...edited, imgUrl: e.target.files[0] })
								}
							/>
						</div>
						<span className='error-message'>
							{errors['imgUrl']?.message || errors['imgUrl']?.msg}
						</span>
						<label htmlFor='Name'>Name</label>
						<input
							type='text'
							name='name'
							className='input'
							placeholder='Name'
							id='Name'
							value={edited.name}
							onChange={(e) => {
								setEdited({ ...edited, name: e.target.value });
							}}
						/>
						<span className='error-message'>
							{errors['name']?.message || errors['name']?.msg}
						</span>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							name='email'
							className='input'
							placeholder='Email'
							id='email'
							value={edited.email}
							onChange={(e) => {
								setEdited({ ...edited, name: e.target.value });
							}}
						/>
						<span className='error-message'>
							{errors['email']?.message || errors['email']?.msg}
						</span>
						<label htmlFor='desc'>Description</label>
						<textarea
							rows='3'
							name='desc'
							className='input'
							placeholder='Description'
							id='desc'
							value={edited.desc}
							onChange={(e) => setEdited({ ...edited, desc: e.target.value })}
						></textarea>
						<span className='error-message'>
							{errors['desc']?.message || errors['desc']?.msg}
						</span>
						<label htmlFor='password'>New Password</label>
						<input
							type='password'
							name='password'
							className='input'
							placeholder='Password'
							id='password'
							value={edited.password}
							onChange={(e) =>
								setEdited({ ...edited, password: e.target.value })
							}
						/>
						<span className='error-message'>
							{errors['password']?.message || errors['password']?.msg}
						</span>
						<input type='submit' className='btn' value='Edit' />
					</form>
				</div>
			</section>
		</React.Fragment>
	);
};

export default EditProfile;
