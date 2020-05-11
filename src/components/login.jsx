import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Joi from '@hapi/joi';
import * as _ from 'lodash';

import { loginUser, loginUserErrors } from '../store/actions/userActions';
import { useHistory } from 'react-router';
import { loginSchema } from '../helpers/schemas';

const Login = () => {
	const pending = useSelector((state) => state.request.pending);
	const errors = useSelector((state) => state.user.errors);

	const [user, setUser] = useState({ email: '', password: '' });
	const [submitted, setSubmitted] = useState(false);

	const classes =
		pending && submitted ? 'login form block blocked' : 'login form block';

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (submitted && !pending && _.isEmpty(errors)) {
			history.goBack();
		}
	}, [errors]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		const { error } = loginSchema.validate(user, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(loginUserErrors(err));
			return;
		}
		dispatch(loginUser(user));
	};

	return (
		<form onSubmit={handleSubmit} action='' className={classes}>
			<div className='loader'></div>
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
				{submitted && (errors['email']?.message || errors['email']?.msg)}
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
				{submitted && (errors['password']?.message || errors['password']?.msg)}
			</span>
			<input type='submit' className='btn' value='Login' />
		</form>
	);
};

export default Login;
