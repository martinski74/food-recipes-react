import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className={styles.header}>
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
        <NavLink to='/logout'>Logout</NavLink>

        {/* <!-- Guest users --> */}

        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
