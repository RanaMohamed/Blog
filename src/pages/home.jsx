import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import queryString from 'query-string';

import {
	getArticles,
	changePage,
	removeArticles,
} from '../store/actions/articleActions';

import Pagination from '../components/pagination';
import Article from '../components/article';

const Home = () => {
	const pending = useSelector((state) => state.request.pending);
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);
	const token = useSelector((state) => state.user.token);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const { q } = queryString.parse(location.search);

	useEffect(() => {
		if (q && !token) history.push('/login');

		return () => dispatch(removeArticles());
	}, []);

	useEffect(() => {
		dispatch(getArticles(null, q));
	}, [currentPage, q]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [articles]);

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					{pending ? (
						<div className='loader'></div>
					) : (
						<React.Fragment>
							{q ? (
								<h3 className='text-center underlined'>
									Search results for - {q}
								</h3>
							) : (
								<h3 className='text-center underlined'>Latest Stories</h3>
							)}

							{articles.map((article) => (
								<Article key={article._id} article={article}></Article>
							))}
							<Pagination></Pagination>
						</React.Fragment>
					)}
				</div>
			</section>
		</React.Fragment>
	);
};

export default Home;
