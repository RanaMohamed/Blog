import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { url } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle, removeArticle } from '../store/actions/articleActions';

const SingleArticle = (props) => {
	const dispatch = useDispatch();

	const article = useSelector((state) => state.article.article) || {};

	useEffect(() => {
		dispatch(getArticle(props.match.params.id));

		return () => dispatch(removeArticle());
	}, []);

	const backgroundImage = article.imgUrl
		? `url(${url + '/' + article.imgUrl})`
		: '';

	const authorImg = article.author?.imgUrl
		? `${url}/${article.author?.imgUrl}`
		: '../placeholder-avatar.png';
	return (
		<React.Fragment>
			<section className='cover-section cover-section--img'>
				<div
					className='cover-section__content'
					style={{
						backgroundImage: backgroundImage,
					}}
				>
					<div className='container text-center'>
						<h1 className=''>{article.title}</h1>
						<div className=''>
							By{' '}
							<Link
								to={`/profile/${article.author?._id}`}
								className='underline-link'
							>
								{article.author?.name}
							</Link>{' '}
							/ {new Date(article.updatedAt).toDateString()}
						</div>
					</div>
				</div>
			</section>
			<section className='main-section'>
				<div className='container'>
					<div className='article'>
						<div
							className='article__body'
							dangerouslySetInnerHTML={{ __html: article.body }}
						></div>
						<div className='article__tags'>
							{article.tags?.map((tag, index) => (
								<Link to={`/?q=${tag}`} key={index} className='tag color-link'>
									{tag}
								</Link>
							))}
						</div>
					</div>
					<h3 className='text-center underlined'>About the author</h3>
					<div className='author'>
						<div className='author__img'>
							<img className='author__img' src={authorImg} alt='' />
						</div>
						<div>
							<h3 className='author__name'>{article.author?.name}</h3>
							<p className='author__desc'>{article.author?.desc}</p>
							<div className='btns-row'>
								<Link to={`/profile/${article.author?._id}`} className='btn'>
									View profile
								</Link>
								<button className='btn btn--outline'>Follow Author</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default SingleArticle;
