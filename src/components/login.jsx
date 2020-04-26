import React from 'react';

function Login() {
  return (
    <React.Fragment>
      <section className='cover-section'></section>
      <section className='main-section'>
        <div className='container'>
          <div className='forms'>
            <form action='' className='login form'>
              <h3 className='text-center underlined underlined--sm'>Login</h3>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                className='input'
                id='email'
                placeholder='Email'
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='input'
                placeholder='Password'
              />
              <input type='submit' className='btn' value='Login' />
            </form>
            <div className='vl'></div>
            <form action='' className='signup form'>
              <h3 className='text-center underlined underlined--sm'>Signup</h3>
              <label htmlFor='sName'>Name</label>
              <input
                type='text'
                name=''
                className='input'
                placeholder='Name'
                id='sName'
              />
              <label htmlFor='sEmail'>Email</label>
              <input
                type='text'
                className='input'
                placeholder='Email'
                id='sEmail'
              />
              <label htmlFor='sPassword'>Password</label>
              <input
                type='password'
                className='input'
                placeholder='Password'
                id='sPassword'
              />
              <input type='submit' className='btn' value='Signup' />
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
