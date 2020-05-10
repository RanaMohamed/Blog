import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';

const Header = () => {
	const user = useSelector((state) => state.user.user);
	const [query, setQuery] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push('/login');
	};

	const searchArticles = (e) => {
		e.preventDefault();
		history.push(`/?q=${query}`);
		setQuery('');
	};

	return (
		<header className='header'>
			<div className='container'>
				<div className='logo'>
					<Link to='/'>LOGO.</Link>
				</div>
				<ul className='nav'>
					{user && (
						<React.Fragment>
							<li className='navlink'>
								<NavLink to='/'>Home</NavLink>
							</li>
							<li className='navlink'>
								<NavLink to='/post'>Add Post</NavLink>
							</li>
							<li className='navlink'>
								<NavLink to='/followed'>Followed</NavLink>
							</li>
							<li className='navlink dropdown'>
								<i className='fa fa-search'></i>

								<div className='dropdown__body search'>
									<form action='' onSubmit={searchArticles}>
										<input
											type='text'
											placeholder='Type here to search'
											className='input'
											value={query}
											onChange={(e) => setQuery(e.target.value)}
										/>
										<button className='btn'>Search</button>
									</form>
								</div>
							</li>
							<li className='navlink dropdown'>
								<span>{user.name}</span>
								<ul className='dropdown__body'>
									<li>
										<NavLink
											to={`/profile/${user._id}`}
											className='dropdown__item color-link'
										>
											View profile
										</NavLink>
									</li>
									<li>
										<NavLink
											to='/editProfile'
											className='dropdown__item color-link'
										>
											Edit profile
										</NavLink>
									</li>
									<li>
										<a
											onClick={(e) => logoutHandler(e)}
											href='/'
											className='dropdown__item color-link'
										>
											Logout
										</a>
									</li>
								</ul>
							</li>
						</React.Fragment>
					)}
					{!user && (
						<li className='navlink'>
							<NavLink to='/login'>Login</NavLink>
						</li>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;
