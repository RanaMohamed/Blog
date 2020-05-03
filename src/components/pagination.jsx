import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePage } from '../store/actions/articleActions';

const Pagination = () => {
	const currentPage = useSelector((state) => state.article.currentPage);
	const perPage = useSelector((state) => state.article.perPage);
	const total = useSelector((state) => state.article.total);

	const pages = Array(Math.ceil(total / perPage))
		.fill()
		.map((_, i) => i + 1);

	const dispatch = useDispatch();

	const handlerPageChange = (page) => {
		dispatch(changePage(page));
	};

	return (
		<React.Fragment>
			{total > perPage && (
				<div className='pagination'>
					<button
						className='btn btn--dark'
						disabled={currentPage === 1}
						onClick={() => handlerPageChange(currentPage - 1)}
					>
						Previous
					</button>
					<div className='pages'>
						{pages.map((p) => {
							return p === currentPage ? (
								<button
									key={p}
									className='btn btn--dark btn--sm'
									onClick={() => handlerPageChange(p)}
								>
									{p}
								</button>
							) : (
								<button
									key={p}
									className='btn btn--dark btn--sm btn--outline'
									onClick={() => handlerPageChange(p)}
								>
									{p}
								</button>
							);
						})}
					</div>
					<button
						className='btn btn--dark'
						disabled={currentPage === pages.length}
						onClick={() => handlerPageChange(currentPage + 1)}
					>
						Next
					</button>
				</div>
			)}
		</React.Fragment>
	);
};

export default Pagination;
