import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, changePage } from '../store/actions/articleActions';
import { useLocation, useHistory } from 'react-router';
import queryString from 'query-string';

const Home = () => {
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);
	const token = useSelector((state) => state.user.token);

	const dispatch = useDispatch();
	const history = useHistory();

	const location = useLocation();

	const { q } = queryString.parse(location.search);

	useEffect(() => {
		if (q && !token) history.push('/login');
		return () => dispatch(changePage(1, 0));
	}, []);

	const hanlderGetArticles = () => {
		dispatch(getArticles(currentPage, null, q));
	};

	useEffect(() => {
		hanlderGetArticles();
	}, [currentPage, dispatch, q]);

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
					{q ? (
						<h3 className='text-center underlined'>Search results for - {q}</h3>
					) : (
						<h3 className='text-center underlined'>Latest Stories</h3>
					)}

					{articles.map((article) => (
						<Article
							key={article._id}
							article={article}
							itemDeleted={() => hanlderGetArticles()}
						></Article>
					))}
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Home;
