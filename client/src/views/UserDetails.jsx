import avatar from '../assets/user.png';
import styles from './UserDetails.module.css';

const UserDetails = () => {
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');
  const profilePicture = localStorage.getItem('profilePicture') || null;

  const myRecipes = () => {};

  return (
    <>
      <div className={styles['user-info']}>
        <h1>User Details</h1>
        {profilePicture && (
          <img
            className={styles.profileImage}
            src={profilePicture}
            alt='user'
          />
        )}

        {!profilePicture && (
          <img className={styles.avatar} src={avatar} alt='avatar' />
        )}

        <div>User ID: {userId}</div>
        <div>User Name: {username}</div>
        <div>User Email: {email}</div>
        <div>Last Activity: {new Date().toLocaleString()}</div>
        <div>My Recipes: 0</div>
      </div>
    </>
  );
};
export default UserDetails;
