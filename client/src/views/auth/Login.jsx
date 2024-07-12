import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { toast } from 'react-toastify';

const Login = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) {
        toast.error('Please fill in all fields!');
        return;
      }
      const response = await fetch('http://localhost:3030/users/login', {
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

      auth.isLoggedIn = true;
      auth.user = data.email;

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('email', data.email);

      toast.success('Successfully logged in!', { autoClose: 1500 });
      navigate('/catalog');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className={styles.login}>
      <section id='login'>
        <div className={styles.form}>
          <h2>Login</h2>
          <form className={styles['login-form']} onSubmit={handleSubmit}>
            <input
              type='text'
              name='email'
              placeholder='email'
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={handleChange}
            />
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
