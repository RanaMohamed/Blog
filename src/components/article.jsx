import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { url } from '../helper';
import { useSelector } from 'react-redux';

const Article = (props) => {
	const { _id, imgUrl, title, body, author } = props.article;
	const user = useSelector((state) => state.user.user);
	const img = imgUrl ? `${url}/${imgUrl}` : '';
	return (
		<div className='article underlined'>
			{user?._id === author?._id && (
				<div className='article__actions dropdown'>
					<a href='/'>
						<i className='fas fa-ellipsis-h'></i>
					</a>
					<ul className='dropdown__body'>
						<li>
							<NavLink
								to={`/post/${_id}`}
								className='dropdown__item color-link'
							>
								Edit
							</NavLink>
						</li>
						<li>
							<NavLink to='/delete' className='dropdown__item color-link'>
								Delete
							</NavLink>
						</li>
					</ul>
				</div>
			)}
			<h1 className='article__title'>
				<Link
					to={{
						pathname: `/article/${_id}`,
						state: { article: props.article },
					}}
					className='color-link'
				>
					{title}
				</Link>
			</h1>
			<div className='article__author'>
				By{' '}
				<Link to={`/profile/${author?._id}`} className='underline-link'>
					{author?.name}
				</Link>
			</div>
			<div className='article__img'>
				<Link
					to={{
						pathname: `/article/${_id}`,
						state: { article: props.article },
					}}
				>
					<img src={img} alt='' />
				</Link>
			</div>
			<div
				className='article__body article__body--sm'
				dangerouslySetInnerHTML={{ __html: body }}
			></div>
			<div className='btns-row'>
				<Link
					to={{
						pathname: `/article/${_id}`,
						state: { article: props.article },
					}}
					className='btn'
				>
					Read on
				</Link>
				<button className='btn btn--outline'>Read later</button>
			</div>
		</div>
	);
};

export default Article;
