import React from 'react';
import Login from '../components/login';
import Signup from '../components/signup';

const Auth = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<div className='forms'>
						<Login></Login>
						<div className='vl'></div>
						<Signup></Signup>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Auth;
