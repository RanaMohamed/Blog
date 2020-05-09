import React, { useState } from 'react';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';

import { url } from '../helper';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './modal';
import { deleteArticle, getArticles } from '../store/actions/articleActions';

const Article = (props) => {
	const { _id, imgUrl, title, body, author } = props.article;
	const [modalOpened, setModalOpened] = useState(false);
	const user = useSelector((state) => state.user.user);

	const dispatch = useDispatch();

	const img = imgUrl ? `${url}/${imgUrl}` : '';
	const hanlderDelete = async () => {
		await dispatch(deleteArticle(_id));
		setModalOpened(false);
		props.itemDeleted();
	};
	return (
		<React.Fragment>
			{modalOpened && (
				<Modal
					closeModal={(e) => {
						e.preventDefault();
						setModalOpened(false);
					}}
					deleteArticle={() => hanlderDelete()}
				></Modal>
			)}
			<div className='article underlined'>
				{user?._id === author?._id && (
					<div className='article__actions dropdown'>
						<i className='fas fa-ellipsis-h'></i>

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
								<a
									href='/delete'
									className='dropdown__item color-link'
									onClick={(e) => {
										e.preventDefault();
										setModalOpened(true);
									}}
								>
									Delete
								</a>
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
		</React.Fragment>
	);
};

export default Article;
