import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../store/actions/articleActions';

const Home = () => {
	const articles = useSelector((state) => state.article.articles);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArticles());
	}, []);
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<h3 className='text-center underlined'>Latest Stories</h3>
					{articles.map((article) => (
						<Article key={article._id} article={article}></Article>
					))}
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Home;
