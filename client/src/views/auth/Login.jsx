import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

const Login = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      const response = await fetch('https://food-recipes-oe00.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.code === 403) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('email', data.email);
      localStorage.setItem('username', data.username);
      if (data.profilePicture) {
        localStorage.setItem('profilePicture', data.profilePicture);
      }

      auth.isLoggedIn = true;
      auth.user = data.username;

      toast.success('Successfully logged in!', { autoClose: 1500 });
      navigate('/catalog');
    } catch (error) {
      console.log(error);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!user.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!user.password) {
      newErrors.password = 'Password is required';
    } else if (user.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <main className={styles.login}>
      <section id='login'>
        <div className={styles.form}>
          <h2>Login</h2>
          <form className={styles['login']} onSubmit={handleSubmit}>
            <input
              style={errors.email ? { border: '2px solid red' } : {}}
              type='text'
              name='email'
              placeholder='email'
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input
              style={errors.password ? { border: '2px solid red' } : {}}
              type='password'
              name='password'
              placeholder='password'
              autoComplete='on'
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <button type='submit'>Login</button>
            <p className={styles.message}>
              Not registered? <Link to={'/register'}>Create an account</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
