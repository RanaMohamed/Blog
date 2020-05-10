import React, { useEffect, useRef } from 'react';
import Pagination from '../components/pagination';
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../helper';
import {
	getProfile,
	removeProfile,
	followUser,
} from '../store/actions/userActions';
import { getArticles, changePage } from '../store/actions/articleActions';
import Article from '../components/article';

const Profile = (props) => {
	const user = useSelector((state) => state.user.profile);
	const loggedUser = useSelector((state) => state.user.user);
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);
	const dispatch = useDispatch();

	const articlesRef = useRef(null);

	useEffect(() => {
		dispatch(getProfile(props.match.params.id));

		return () => {
			dispatch(removeProfile());
			dispatch(changePage(1, 0));
		};
	}, []);

	useEffect(() => {
		if (window.scrollY !== 0)
			window.scrollTo({
				top: articlesRef.current.offsetTop - 50,
				behavior: 'smooth',
			});
	}, [articles]);

	const handlerGetArticles = () => {
		dispatch(getArticles(currentPage, props.match.params.id));
	};

	useEffect(() => {
		handlerGetArticles();
	}, [currentPage, dispatch]);

	const handlerFollow = (follow) => {
		dispatch(followUser(user._id, follow));
	};

	const authorImg = user?.imgUrl
		? `${url}/${user?.imgUrl}`
		: '../placeholder-avatar.png';
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<div className='author author--vertical'>
						<img className='author__img' src={authorImg} alt='' />
						<h3 className='author__name underlined underlined--sm'>
							{user?.name}
						</h3>
						<p className='author__desc text-center'>{user?.desc}</p>
						<div className='btns-row underlined'>
							{user?._id !== loggedUser?._id &&
							loggedUser?.following.indexOf(user?._id) === -1 ? (
								<button
									className='btn btn--outline'
									onClick={() => handlerFollow(true)}
								>
									Follow Author
								</button>
							) : (
								<button className='btn' onClick={() => handlerFollow(false)}>
									Unfollow Author
								</button>
							)}
						</div>
					</div>
					<div ref={articlesRef}>
						{articles.map((article) => (
							<Article
								key={article._id}
								article={article}
								itemDeleted={() => handlerGetArticles()}
							></Article>
						))}
					</div>
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Profile;
