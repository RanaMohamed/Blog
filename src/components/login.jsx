import React from 'react';

const Login = () => {
	return (
		<form action='' className='login form'>
			<h3 className='text-center underlined underlined--sm'>Login</h3>
			<label htmlFor='email'>Email</label>
			<input type='text' className='input' id='email' placeholder='Email' />
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				id='password'
				className='input'
				placeholder='Password'
			/>
			<input type='submit' className='btn' value='Login' />
		</form>
	);
};

export default Login;
