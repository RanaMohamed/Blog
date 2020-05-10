import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';

import Header from './components/header';
import Home from './pages/home';
import SingleArticle from './pages/singleArticle';
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import Auth from './pages/auth';
import Error404 from './pages/error404';
import PostForm from './pages/postForm';
import ProtectedRoute from './components/protectedRoute';

import { loadUser, getUser } from './store/actions/userActions';
import Followed from './pages/followed';

function App() {
	const token = useSelector((state) => state.user.token);
	const loaded = useSelector((state) => state.user.loaded);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		if (token) dispatch(getUser(token));
	}, [dispatch, token]);

	return (
		<React.Fragment>
			{loaded && (
				<div className='App'>
					<Header></Header>
					<Switch>
						<Route path='/login' component={Auth}></Route>
						<ProtectedRoute
							path='/post/:id?'
							component={PostForm}
						></ProtectedRoute>
						<ProtectedRoute
							path='/profile/:id'
							component={Profile}
						></ProtectedRoute>
						<ProtectedRoute
							path='/editProfile'
							component={EditProfile}
						></ProtectedRoute>
						<ProtectedRoute
							path='/followed'
							component={Followed}
						></ProtectedRoute>
						<Route path='/article/:id' component={SingleArticle}></Route>
						<Route path='/error' component={Error404}></Route>
						<Route path='/' component={Home} exact={true}></Route>
						<Redirect to='/error'></Redirect>
					</Switch>
				</div>
			)}
		</React.Fragment>
	);
}

export default App;
