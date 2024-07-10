import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Register.module.css';
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (input.password !== input.repass) {
        alert('passwords do not match');
        return;
      }
      const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      setInput({
        email: '',
        password: '',
        repass: '',
      });

      toast.success('Successfully registered!');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <main className={styles.register}>
      <section id='register'>
        <div className={styles.form}>
          <h2>Register</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='email'
              placeholder='email'
              onChange={handleChange}
              // value={input.email}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={handleChange}
              // value={input.password}
            />
            <input
              type='password'
              name='repass'
              placeholder='repeat password'
              onChange={handleChange}
              // value={input.repass}
            />
            <button type='submit'>Register</button>
            <p className={styles.message}>
              Already registered? <Link to={'/login'}>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Register;
