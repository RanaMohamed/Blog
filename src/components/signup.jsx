import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash';

import { registerUser, registerUserErrors } from '../store/actions/userActions';
import { registerSchema } from '../helpers/schemas';

const Signup = (props) => {
	const errors = useSelector((state) => state.user.errors);
	const pending = useSelector((state) => state.request.pending);

	const [user, setUser] = useState({ name: '', email: '', password: '' });
	const [submitted, setSubmitted] = useState(false);

	const classes =
		pending && submitted ? 'signup form block blocked' : 'signup form block';

	const dispatch = useDispatch();

	useEffect(() => {
		if (submitted && !pending && _.isEmpty(errors)) {
			setUser({ name: '', email: '', password: '' });
			setSubmitted(false);
		}
	}, [errors]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		const { error } = registerSchema.validate(user, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(registerUserErrors(err));
			return;
		}
		dispatch(registerUser(user));
	};

	return (
		<form onSubmit={handleSubmit} action='' className={classes}>
			<div className='loader'></div>
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
			<span className='error-message'>
				{submitted && (errors['name']?.message || errors['name']?.msg)}
			</span>
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
			<span className='error-message'>
				{submitted && (errors['email']?.message || errors['email']?.msg)}
			</span>
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
			<span className='error-message'>
				{submitted && (errors['password']?.message || errors['password']?.msg)}
			</span>
			<input type='submit' className='btn' value='Signup' />
		</form>
	);
};

export default Signup;
