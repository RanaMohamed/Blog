import React, { useEffect } from 'react';
import Pagination from '../components/pagination';
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../helper';
import { getProfile, removeProfile } from '../store/actions/userActions';

const Profile = (props) => {
	const user = useSelector((state) => state.user.profile);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfile(props.match.params.id));

		return () => dispatch(removeProfile());
	}, []);

	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<div className='author author--vertical'>
						<img
							className='author__img'
							src={url + '/' + user?.imgUrl}
							alt=''
						/>
						<h3 className='author__name underlined underlined--sm'>
							{user?.name}
						</h3>
						<p className='author__desc text-center'>{user?.desc}</p>
						<div className='btns-row underlined'>
							<button className='btn btn--outline'>Follow Author</button>
						</div>
					</div>
					{/* <Article></Article>
					<Article></Article>
					<Article></Article>
					<Article></Article> */}
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Profile;
