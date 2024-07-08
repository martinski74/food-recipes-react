import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/catalog'>Dashboard</Link>
          <Link to='/about'>About</Link>
        </div>

        {/* <!-- Logged-in users --> */}
        <div className='user'>
          <Link to='/create'>Add Recipe</Link>
          <Link to='/logout'>Logout</Link>
        </div>

        {/* <!-- Guest users --> */}
        <div className='guest'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
