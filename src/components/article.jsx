import React from 'react';
import { Link } from 'react-router-dom';

import { url } from '../helper';

const Article = (props) => {
	const { _id, imgUrl, title, body, author } = props.article;
	const img = imgUrl ? `${url}/${imgUrl}` : '';
	return (
		<div className='article underlined'>
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
