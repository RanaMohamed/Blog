import React, { useEffect } from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import { useSelector } from 'react-redux';

const Auth = (props) => {
	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		if (token) {
			props.history.replace('/');
		}
	}, [token, props]);

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
