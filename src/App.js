import React from 'react';
import { Switch, Route } from 'react-router';

import Header from './components/header';
import Home from './pages/home';
import SingleArticle from './pages/singleArticle';
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import AddPost from './pages/addPost';
import Auth from './pages/auth';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default App;
