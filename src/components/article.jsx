import React from 'react';
import { Link } from 'react-router-dom';

const Article = () => {
	return (
		<div className='article underlined'>
			<h1 className='article__title'>
				<Link to='/article' className='color-link'>
					KNIGHTS, I BID YOU WELCOME TO YOUR NEW HOME
				</Link>
			</h1>
			<div className='article__author'>
				By{' '}
				<Link to='/profile' className='underline-link'>
					Madison Barnett
				</Link>
			</div>
			<div className='article__img'>
				<Link to='/article'>
					<img
						src='https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/02/tpology22-720x464.jpg'
						alt=''
					/>
				</Link>
			</div>
			<div className='article__body article__body--sm'>
				<p>
					Uniquely monetize virtual leadership skills vis-a-vis parallel
					materials. Dramatically disintermediate excellent manufactured
					products for innovative partnerships. Enthusiastically exploit
					standards compliant customer service for premium initiatives.
					Phosfluorescently administrate best-of-breed content after granular
					experiences. Phosfluorescently redefine enterprise e-services with
					real-time outsourcing.
				</p>
				<p>
					Rapidiously brand quality meta-services rather than distributed
					bandwidth. Interactively disintermediate economically sound e-services
					and intuitive internal or “organic” sources. Credibly expedite
					multidisciplinary processes for tactical information. Uniquely
					incubate interoperable communities with flexible solutions.
					Conveniently recaptiualize virtual testing procedures vis-a-vis
					open-source products.
				</p>
			</div>
			<div className='btns-row'>
				<Link to='/article' className='btn'>
					Read on
				</Link>
				<button className='btn btn--outline'>Read later</button>
			</div>
		</div>
	);
};

export default Article;
