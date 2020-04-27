import React from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';

const Home = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<h3 className='text-center underlined'>Latest Stories</h3>
					<Article></Article>
					<Article></Article>
					<Article></Article>
					<Article></Article>
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Home;
