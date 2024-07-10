import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navigation = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const handleLogout = async () => {
    if (!token) {
      toast.error('You are not logged in!');
      return;
    }
    const res = await fetch('http://localhost:3030/users/logout', {
      method: 'GET',
      headers: {
        'X-Authorization': token,
      },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => {
      navigate('/');
      toast.success('Successfully logged out!');
    }, 500);
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

        <NavLink to='/create'>Add Recipe</NavLink>
        <span onClick={handleLogout}>Logout</span>

        {/* <!-- Guest users --> */}

        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
