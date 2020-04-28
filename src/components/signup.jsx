import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';
import { registerUser, registerUserErrors } from '../store/actions/userActions';

const Signup = (props) => {
	const [user, setUser] = useState({ name: '', email: '', password: '' });

	const errors = useSelector((state) => state.user.errors);
	const dispatch = useDispatch();

	useEffect(() => {
		if (Object.keys(errors).length === 0)
			setUser({ name: '', email: '', password: '' });
	}, [errors]);

	// eslint-disable-next-line no-useless-escape
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
			dispatch(registerUserErrors(err));
			return;
		}
		dispatch(registerUser(user));
	};

	return (
		<form onSubmit={handlerSubmit} action='' className='signup form'>
			<h3 className='text-center underlined underlined--sm'>Signup</h3>
			<label htmlFor='sName'>Name</label>
			<input
				type='text'
				name='name'
				className='input'
				placeholder='Name'
				id='sName'
				value={user.name}
				onChange={(e) => setUser({ ...user, name: e.target.value })}
			/>
			<span className='error-message'>{errors['name']?.message}</span>
			<label htmlFor='sEmail'>Email</label>
			<input
				type='text'
				name='email'
				className='input'
				placeholder='Email'
				id='sEmail'
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
			/>
			<span className='error-message'>{errors['email']?.message}</span>
			<label htmlFor='sPassword'>Password</label>
			<input
				type='password'
				name='password'
				className='input'
				placeholder='Password'
				id='sPassword'
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			<span className='error-message'>{errors['password']?.message}</span>
			<input type='submit' className='btn' value='Signup' />
		</form>
	);
};

export default Signup;
