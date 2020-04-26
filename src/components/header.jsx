import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>LOGO.</div>
        <ul className='nav'>
          <li className='navlink'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='navlink'>
            <NavLink to='/addPost'>Add Post</NavLink>
          </li>
          <li className='navlink'>
            <a href='/'>Followed</a>
          </li>
          <li className='navlink dropdown'>
            <a href='/'>Search</a>
            <div className='dropdown__body search'>
              <input
                type='text'
                placeholder='Type here to search'
                className='input'
              />
              <button className='btn'>Search</button>
            </div>
          </li>
          <li className='navlink dropdown'>
            <a href='/'>Profile</a>
            <ul className='dropdown__body'>
              <li>
                <NavLink to='/profile' className='dropdown__item color-link'>
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
                <a href='/' className='dropdown__item color-link'>
                  Logout
                </a>
              </li>
            </ul>
          </li>
          <li className='navlink'>
            <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
