import { Link } from 'react-router-dom';

import styles from './Register.module.css';
const Register = () => {
  return (
    <main className={styles.register}>
      <section id='register'>
        <div className={styles.form}>
          <h2>Register</h2>
          <form className='login-form'>
            <input
              type='text'
              name=''
              id='register-email'
              placeholder='email'
            />
            <input
              type='password'
              name=''
              id='register-password'
              placeholder='password'
            />
            <input
              type='password'
              name=''
              id='repeat-password'
              placeholder='repeat password'
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
