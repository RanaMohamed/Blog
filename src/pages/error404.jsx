import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<h1 className='first-letter-contianer'>
						<div className='first-letter'>P</div> Page not found
					</h1>
					<p>
						The page that you are looking for does not exist on this website.
						You may have accidentally mistype the page address, or followed an
						expired link. Anyway, we will help you get back on track
					</p>
					<br />
					<Link to='/' className='btn btn--dark'>
						Go to home
					</Link>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Error404;
