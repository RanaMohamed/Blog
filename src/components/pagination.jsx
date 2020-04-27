import React from 'react';

const Pagination = () => {
	return (
		<div className='pagination'>
			<button className='btn btn--dark'>Previous</button>
			<div className='pages'>
				<button className='btn btn--dark btn--sm btn--outline'>1</button>
				<button className='btn btn--dark btn--sm btn--outline'>2</button>
				<button className='btn btn--dark btn--sm'>3</button>
				<button className='btn btn--dark btn--sm btn--outline'>4</button>
			</div>
			<button className='btn btn--dark'>Next</button>
		</div>
	);
};

export default Pagination;
