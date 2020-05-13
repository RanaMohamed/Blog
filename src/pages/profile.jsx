import React, { useEffect, useRef } from 'react';
import Pagination from '../components/pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
	getProfile,
	removeProfile,
	followUser,
} from '../store/actions/userActions';
import { getArticles, removeArticles } from '../store/actions/articleActions';
import Article from '../components/article';

const Profile = (props) => {
	const pending = useSelector((state) => state.request.pending);
	const user = useSelector((state) => state.user.profile);
	const loggedUser = useSelector((state) => state.user.user);
	const articles = useSelector((state) => state.article.articles);
	const currentPage = useSelector((state) => state.article.currentPage);

	const authorImg = user?.imgUrl ? user.imgUrl : '../placeholder-avatar.png';

	const dispatch = useDispatch();
	const articlesRef = useRef(null);

	useEffect(() => {
		dispatch(getProfile(props.match.params.id));

		return () => {
			dispatch(removeProfile());
			dispatch(removeArticles());
		};
	}, []);

	useEffect(() => {
		dispatch(getArticles(props.match.params.id));
	}, [currentPage]);

	useEffect(() => {
		if (window.scrollY !== 0)
			window.scrollTo({
				top: articlesRef.current.offsetTop - 50,
				behavior: 'smooth',
			});
	}, [articles]);

	const handleFollow = (follow) => {
		dispatch(followUser(user._id, follow));
	};

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					{pending ? (
						<div className='loader'></div>
					) : (
						<React.Fragment>
							<div className='author author--vertical'>
								<img className='author__img' src={authorImg} alt='' />
								<h3 className='author__name underlined underlined--sm'>
									{user?.name}
								</h3>
								<p className='author__desc text-center'>{user?.desc}</p>
								<div className='btns-row underlined'>
									{user?._id !== loggedUser?._id &&
										(loggedUser?.following.indexOf(user?._id) === -1 ? (
											<button
												className='btn btn--outline'
												onClick={() => handleFollow(true)}
											>
												Follow Author
											</button>
										) : (
											<button
												className='btn'
												onClick={() => handleFollow(false)}
											>
												Unfollow Author
											</button>
										))}
								</div>
							</div>
							<div ref={articlesRef}>
								{articles.map((article) => (
									<Article key={article._id} article={article}></Article>
								))}
							</div>
							<Pagination></Pagination>
						</React.Fragment>
					)}
				</div>
			</section>
		</React.Fragment>
	);
};

export default Profile;
