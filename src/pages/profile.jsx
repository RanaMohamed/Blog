import React from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';
import { useSelector } from 'react-redux';
import { url } from '../helper';

const Profile = () => {
	const user = useSelector((state) => state.user.user);
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
					<Article></Article>
					<Article></Article>
					<Article></Article>
					<Article></Article>
					<Pagination></Pagination>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Profile;
