import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as _ from 'lodash';

import { editProfile, editProfileErrors } from '../store/actions/userActions';
import { editProfileSchema } from '../helpers/schemas';
import { useHistory } from 'react-router';

const EditProfile = () => {
	const pending = useSelector((state) => state.request.pending);
	const user = useSelector((state) => state.user.user);
	const errors = useSelector((state) => state.user.errors);
	const [edited, setEdited] = useState({
		imgUrl: '',
		name: '',
		email: '',
		desc: '',
		password: '',
	});
	const [imgUrl, setImgUrl] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const classes = pending ? 'form block blocked' : 'form block';

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (submitted && !pending && _.isEmpty(errors))
			history.push(`/profile/${user._id}`);
		if (user) setEdited({ ...edited, ...user });
	}, [user]);

	useEffect(() => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImgUrl(e.target.result);
		};
		if (typeof edited.imgUrl === 'object') reader.readAsDataURL(edited.imgUrl);
		else setImgUrl(edited.imgUrl ? edited.imgUrl : 'placeholder-avatar.png');
	}, [edited.imgUrl]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		const { error } = editProfileSchema.validate(user, { abortEarly: false });
		if (error) {
			const err = _.keyBy(error.details, (e) => e.context.label);
			dispatch(editProfileErrors(err));
			return;
		}
		dispatch(editProfile(_.pickBy(edited)));
	};

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<h3 className='text-center underlined underlined--sm'>
						Edit Profile
					</h3>
					<form onSubmit={handleSubmit} action='' className={classes}>
						<div className='loader'></div>
						<div className='input-img input-img--avatar'>
							<img src={imgUrl} alt='' />
							<input
								type='file'
								name='imgUrl'
								id='imgUrl'
								onChange={(e) =>
									setEdited({ ...edited, imgUrl: e.target.files[0] })
								}
							/>
							<i className='fas fa-camera input-img__icon'></i>
						</div>
						<span className='error-message'>
							{errors['imgUrl']?.message || errors['imgUrl']?.msg}
						</span>
						<label htmlFor='Name'>Name</label>
						<input
							type='text'
							name='name'
							className='input'
							placeholder='Name'
							id='Name'
							value={edited.name}
							onChange={(e) => {
								setEdited({ ...edited, name: e.target.value });
							}}
						/>
						<span className='error-message'>
							{errors['name']?.message || errors['name']?.msg}
						</span>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							name='email'
							className='input'
							placeholder='Email'
							id='email'
							value={edited.email}
							onChange={(e) => {
								setEdited({ ...edited, email: e.target.value });
							}}
						/>
						<span className='error-message'>
							{errors['email']?.message || errors['email']?.msg}
						</span>
						<label htmlFor='desc'>Description</label>
						<textarea
							rows='3'
							name='desc'
							className='input'
							placeholder='Description'
							id='desc'
							value={edited.desc}
							onChange={(e) => setEdited({ ...edited, desc: e.target.value })}
						></textarea>
						<span className='error-message'>
							{errors['desc']?.message || errors['desc']?.msg}
						</span>
						<label htmlFor='password'>New Password</label>
						<input
							type='password'
							name='password'
							className='input'
							placeholder='Password'
							id='password'
							value={edited.password}
							onChange={(e) =>
								setEdited({ ...edited, password: e.target.value })
							}
						/>
						<span className='error-message'>
							{errors['password']?.message || errors['password']?.msg}
						</span>
						<input type='submit' className='btn' value='Edit' />
					</form>
				</div>
			</section>
		</React.Fragment>
	);
};

export default EditProfile;
