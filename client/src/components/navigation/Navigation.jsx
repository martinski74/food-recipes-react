import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navigation = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  let token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const handleLogout = async () => {
    if (!token) {
      // toast.error('You are not logged in!');
      return;
    }
    try {
      const res = await fetch('https://food-recipes-oe00.onrender.com/users/logout', {
        method: 'GET',
        headers: {
          'X-Authorization': token,
        },
      });
      localStorage.clear();
      auth.isLoggedIn = false;
      auth.user = null;
      setTimeout(() => {
        navigate('/');
        toast.success('Successfully logged out!', { autoClose: 1500 });
      }, 400);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: token, user: username }}>
      <header className='header'>
        <nav>
          <img
            width={90}
            // height={40}
            src='https://cdn.freebiesupply.com/logos/large/2x/my-recipes-logo-png-transparent.png'
            alt=''
          />

          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Recipe Catalog</NavLink>
          <NavLink to='/serach'>Search</NavLink>

          {/* <!-- Logged-in users --> */}

          {auth.isLoggedIn && <NavLink to='/create'>Add Recipe</NavLink>}
          {auth.isLoggedIn && <span onClick={handleLogout}>Logout</span>}
          {auth.isLoggedIn && (
            <NavLink to={`/user/${userId}`}>Welcome, {auth.user}</NavLink>
          )}

          {/* <!-- Guest users --> */}

          {!auth.isLoggedIn && !token && <NavLink to='/login'>Login</NavLink>}
          {!auth.isLoggedIn && !token && (
            <NavLink to='/register'>Register</NavLink>
          )}
        </nav>
      </header>
    </AuthContext.Provider>
  );
};

export default Navigation;
