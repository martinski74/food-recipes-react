import { Link } from 'react-router-dom';
import styles from './404.module.css';

const NotFound = () => {
  return (
    <section className={styles['error-page']}>
      <h2>404!</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to='/' className={styles['btn']}>
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFound;
