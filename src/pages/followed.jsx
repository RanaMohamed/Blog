import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getFollowed } from '../store/actions/articleActions';

const Followed = () => {
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);
	const user = useSelector((state) => state.user.user);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => dispatch(changePage(1, 0));
	}, []);

	const hanlderGetFollowed = () => {
		dispatch(getFollowed(currentPage));
	};

	useEffect(() => {
		hanlderGetFollowed(currentPage);
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
						<React.Fragment>
							<h3 className='text-center underlined'>Followed Authors</h3>
							{articles.map((article) => (
								<Article
									key={article._id}
									article={article}
									itemDeleted={() => hanlderGetFollowed()}
								></Article>
							))}
							<Pagination></Pagination>
						</React.Fragment>
					) : (
						<h2 className='text-center'>Start following authors</h2>
					)}
				</div>
			</section>
		</React.Fragment>
	);
};

export default Followed;
