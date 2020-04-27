import React from 'react';

const AddPost = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<form action='' className='form'>
						<h3 className='text-center underlined underlined--sm'>Add Post</h3>
						<div className='input-img'>
							<img
								src='https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/01/tpology30-1920x815.jpg'
								alt=''
							/>
							<input type='file' name='' id='' />
						</div>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='body'
							className='input'
							placeholder='Title'
							id='title'
						/>
						<label htmlFor='body'>Body</label>
						<textarea
							name='body'
							id='body'
							rows='10'
							className='input'
							placeholder='Body'
						></textarea>
						<label htmlFor='tags'>Tags</label>
						<textarea
							rows='3'
							id='tags'
							className='input'
							placeholder='Tags'
						></textarea>
						<input type='submit' className='btn' value='Save' />
					</form>
				</div>
			</section>
		</React.Fragment>
	);
};

export default AddPost;
