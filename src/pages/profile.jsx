import React from 'react';
import Pagination from '../components/pagination';
import Article from '../components/article';

const Profile = () => {
	return (
		<React.Fragment>
			<section className='cover-section'></section>
			<section className='main-section'>
				<div className='container'>
					<div className='author author--vertical'>
						<img
							className='author__img'
							src='https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/03/madison_barnett-100x100.jpg'
							alt=''
						/>
						<h3 className='author__name underlined underlined--sm'>
							Madison Barnett
						</h3>
						<p className='author__desc text-center'>
							I get my inspiration from the fictional world. I'm a social geek.
							Completely exploit 24/365 catalysts for change whereas high
							standards in action items. Conveniently whiteboard multifunctional
							benefits without enabled leadership.
						</p>
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
