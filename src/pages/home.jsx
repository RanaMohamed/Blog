import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, changePage } from '../store/actions/articleActions';

const Home = () => {
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => dispatch(changePage(1, 0));
	}, []);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [articles]);

	useEffect(() => {
		dispatch(getArticles(currentPage));
	}, [currentPage, dispatch]);

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
