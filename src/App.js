import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router';

import Header from './components/header';
import Home from './pages/home';
import SingleArticle from './pages/singleArticle';
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import AddPost from './pages/addPost';
import Auth from './pages/auth';

import { loadUser, getUser } from './store/actions/userActions';
import ProtectedRoute from './components/protectedRoute';
import { clearRedirectTo } from './store/actions/routeActions';

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

	const history = useHistory();

	useEffect(() => {
		dispatch(clearRedirectTo());
	}, [history.location.pathname]);

	return (
		<div className='App'>
			<Header></Header>
			<Switch>
				<Route path='/login' component={Auth}></Route>
				<ProtectedRoute path='/addPost' component={AddPost}></ProtectedRoute>
				{/* <Route path='/addPost' component={AddPost}></Route> */}
				<ProtectedRoute
					path='/profile/:id?'
					component={Profile}
				></ProtectedRoute>
				<ProtectedRoute
					path='/editProfile'
					component={EditProfile}
				></ProtectedRoute>
				<Route path='/article/:id?' component={SingleArticle}></Route>
				<Route path='/' component={Home}></Route>
			</Switch>
		</div>
	);
}

export default App;
