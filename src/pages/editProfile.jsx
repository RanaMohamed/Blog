import React from 'react';

const EditProfile = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<form action='' className='form'>
						<h3 className='text-center underlined underlined--sm'>
							Edit Profile
						</h3>
						<div className='input-img input-img--avatar'>
							<img
								src='https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/03/madison_barnett-100x100.jpg'
								alt=''
							/>
							<input type='file' name='' id='' />
						</div>
						<label htmlFor='Name'>Name</label>
						<input
							type='text'
							name=''
							className='input'
							placeholder='Name'
							id='Name'
						/>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							className='input'
							id='email'
							placeholder='Email'
						/>
						<label htmlFor='desc'>Desc</label>
						<textarea
							rows='3'
							id='desc'
							className='input'
							placeholder='Description'
						></textarea>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='input'
							placeholder='Password'
						/>
						<label htmlFor='cPassword'>Confirm Passowrd</label>
						<input
							type='password'
							id='cPassword'
							className='input'
							placeholder='Confirm Password'
						/>
						<input type='submit' className='btn' value='Edit' />
					</form>
				</div>
			</section>
		</React.Fragment>
	);
};

export default EditProfile;
