import React from 'react';

const Modal = (props) => {
	return (
		<React.Fragment>
			<div className='modal'>
				<div className='modal__body'>
					<a href='/' className='modal__close' onClick={props.closeModal}>
						<i className='fa fa-times'></i>
					</a>
					<h1 className='modal__title'>Are you sure you want to delete?</h1>
					<div className='modal__buttons'>
						<button className='btn btn--outline' onClick={props.closeModal}>
							Cancel
						</button>
						<button className='btn' onClick={props.deleteArticle}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
