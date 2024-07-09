import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  return (
    <main className={styles.login}>
      <section id='login'>
        <div className={styles.form}>
          <h2>Login</h2>
          <form className={styles['login-form']}>
            <input type='text' name='' id='email' placeholder='email' />
            <input
              type='password'
              name=''
              id='password'
              placeholder='password'
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
