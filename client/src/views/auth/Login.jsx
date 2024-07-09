import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', data.username);
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
