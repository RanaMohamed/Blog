import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/userActions';

const Signup = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const errors = useSelector((state) => state.user.errors);
	const dispatch = useDispatch();

	const handlerSubmit = async (e) => {
		e.preventDefault();
		dispatch(registerUser({ name, email, password }));
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
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<span className='error-message'>{errors['name']?.message}</span>
			<label htmlFor='sEmail'>Email</label>
			<input
				type='text'
				name='email'
				className='input'
				placeholder='Email'
				id='sEmail'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<span className='error-message'>{errors['email']?.message}</span>
			<label htmlFor='sPassword'>Password</label>
			<input
				type='password'
				name='password'
				className='input'
				placeholder='Password'
				id='sPassword'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<span className='error-message'>{errors['password']?.message}</span>
			<input type='submit' className='btn' value='Signup' />
		</form>
	);
};

export default Signup;
