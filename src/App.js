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
import { changePage } from './store/actions/articleActions';

function App() {
	const token = useSelector((state) => state.user.token);

	const redirectTo = useSelector((state) => state.route.redirectTo);

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	useEffect(() => {
		if (token) dispatch(getUser(token));
	}, [dispatch, token]);

	useEffect(() => {
		if (redirectTo) history.replace(redirectTo);
	}, [history, redirectTo]);

	useEffect(() => {
		dispatch(clearRedirectTo());
		dispatch(changePage(1, 0));
	}, [dispatch, history.location.pathname]);

	return (
		<div className='App'>
			<Header></Header>
			<Switch>
				<Route path='/login' component={Auth}></Route>
				<ProtectedRoute path='/addPost' component={AddPost}></ProtectedRoute>
				{/* <Route path='/addPost' component={AddPost}></Route> */}
				<ProtectedRoute
					path='/profile/:id'
					component={Profile}
				></ProtectedRoute>
				<ProtectedRoute
					path='/editProfile'
					component={EditProfile}
				></ProtectedRoute>
				<Route path='/article/:id' component={SingleArticle}></Route>
				<Route path='/' component={Home}></Route>
			</Switch>
		</div>
	);
}

export default App;
