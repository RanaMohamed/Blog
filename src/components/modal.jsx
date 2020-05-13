import React, { useState } from 'react';
import { deleteArticle, getArticles } from '../store/actions/articleActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const Modal = (props) => {
	const [pending, setPending] = useState(false);
	const classes = pending ? 'modal__body block blocked' : 'modal__body block';

	const dispatch = useDispatch();
	const params = useParams();

	const handleDelete = async (e) => {
		try {
			setPending(true);
			await deleteArticle(props.id);
			params.id ? dispatch(getArticles(params.id)) : dispatch(getArticles());
		} catch (error) {
			setPending(false);
		}
	};
	return (
		<React.Fragment>
			<div className='modal'>
				<div className={classes}>
					<div className='loader'></div>
					<a href='/' className='modal__close' onClick={props.closeModal}>
						<i className='fa fa-times'></i>
					</a>
					<h2 className='modal__title'>Are you sure you want to delete?</h2>
					<div className='modal__buttons'>
						<button className='btn btn--outline' onClick={props.closeModal}>
							Cancel
						</button>
						<button className='btn' onClick={handleDelete}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
