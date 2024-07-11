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
  const handleLogout = async () => {
    if (!token) {
      // toast.error('You are not logged in!');
      return;
    }
    const res = await fetch('http://localhost:3030/users/logout', {
      method: 'GET',
      headers: {
        'X-Authorization': token,
      },
    });
    localStorage.clear();
    auth.isLoggedIn = false;
    setTimeout(() => {
      navigate('/');
      toast.success('Successfully logged out!');
    }, 400);
  };

  return (
    <header className='header'>
      <nav>
        <img
          width={80}
          height={40}
          src='https://cdn.freebiesupply.com/logos/large/2x/my-recipes-logo-png-transparent.png'
          alt=''
        />

        <NavLink to='/'>Home</NavLink>
        <NavLink to='/catalog'>Dashboard</NavLink>
        <NavLink to='/about'>About</NavLink>

        {/* <!-- Logged-in users --> */}

        {auth.isLoggedIn && <NavLink to='/create'>Add Recipe</NavLink>}
        {auth.isLoggedIn && <span onClick={handleLogout}>Logout</span>}
        {auth.isLoggedIn && (
          <span>Welcome, {auth.user.substring(0, auth.user.indexOf('@'))}</span>
        )}

        {/* <!-- Guest users --> */}

        {!auth.isLoggedIn && <NavLink to='/login'>Login</NavLink>}
        {!auth.isLoggedIn && <NavLink to='/register'>Register</NavLink>}
      </nav>
    </header>
  );
};

export default Navigation;
