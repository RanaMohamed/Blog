import React from 'react';
import Header from './components/header';
import Home from './components/home';
import { Switch, Route } from 'react-router';
import SingleArticle from './components/singleArticle';
import Profile from './components/profile';
import EditProfile from './components/editProfile';
import AddPost from './components/addPost';
import Login from './components/login';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Switch>
        <Route path='/login' component={Login}></Route>
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
