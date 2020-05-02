import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';

import { loginUser, loginUserErrors } from '../store/actions/userActions';
import { emailRegex } from '../helper';

const Login = () => {
	const [user, setUser] = useState({ email: '', password: '' });

	const errors = useSelector((state) => state.user.loginErrors);

	const dispatch = useDispatch();

	const schema = Joi.object({
		email: Joi.string().required().pattern(emailRegex).messages({
			'string.pattern.base': 'Email is invalid',
			'string.empty': 'Email should not be empty',
			'any.required': `Email is required`,
		}),
		password: Joi.string().min(8).required().messages({
			'string.empty': 'Password should not be empty',
			'string.min': `Password should have a minimum length of {#limit}`,
			'any.required': `Password is required`,
		}),
	});

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const { error } = schema.validate(user, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(loginUserErrors(err));
			return;
		}
		dispatch(loginUser(user));
	};

	return (
		<form onSubmit={handlerSubmit} action='' className='login form'>
			<h3 className='text-center underlined underlined--sm'>Login</h3>
			<label htmlFor='email'>Email</label>
			<input
				type='text'
				name='email'
				className='input'
				placeholder='Email'
				id='email'
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
			/>
			<span className='error-message'>
				{errors['email']?.message || errors['email']?.msg}
			</span>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				name='password'
				className='input'
				placeholder='Password'
				id='password'
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			<span className='error-message'>
				{errors['password']?.message || errors['password']?.msg}
			</span>
			<input type='submit' className='btn' value='Login' />
		</form>
	);
};

export default Login;
