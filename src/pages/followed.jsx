import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowed, removeArticles } from '../store/actions/articleActions';

const Followed = () => {
	const pending = useSelector((state) => state.request.pending);
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);
	const user = useSelector((state) => state.user.user);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => dispatch(removeArticles());
	}, []);

	useEffect(() => {
		dispatch(getFollowed());
	}, [currentPage]);

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
					{user?.following.length > 0 ? (
						pending ? (
							<div className='loader'></div>
						) : (
							<React.Fragment>
								<h3 className='text-center underlined'>Followed Authors</h3>
								{articles.map((article) => (
									<Article key={article._id} article={article}></Article>
								))}
								<Pagination></Pagination>
							</React.Fragment>
						)
					) : (
						<h2 className='text-center'>Start following authors</h2>
					)}
				</div>
			</section>
		</React.Fragment>
	);
};

export default Followed;
