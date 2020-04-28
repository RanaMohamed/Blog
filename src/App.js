import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';

import Header from './components/header';
import Home from './pages/home';
import SingleArticle from './pages/singleArticle';
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import AddPost from './pages/addPost';
import Auth from './pages/auth';

import { loadUser, getUser } from './store/actions/userActions';

function App() {
	const token = useSelector((state) => state.user.token);
	const user = useSelector((state) => state.user.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	useEffect(() => {
		if (token && !user) dispatch(getUser(token));
	}, [token, user, dispatch]);

	return (
		<div className='App'>
			<Header></Header>
			<Switch>
				<Route path='/login' component={Auth}></Route>
				<Route path='/addPost' component={AddPost}></Route>
				<Route path='/profile' component={Profile}></Route>
				<Route path='/editProfile' component={EditProfile}></Route>
				<Route path='/article' component={SingleArticle}></Route>
				<Route path='/' component={Home}></Route>
			</Switch>
		</div>
	);
}

export default App;
