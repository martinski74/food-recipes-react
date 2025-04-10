import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import avatar from '../assets/user.png';
import styles from './UserDetails.module.css';

const UserDetails = () => {
  const { id } = useParams();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');
  const profilePicture = localStorage.getItem('profilePicture');

  const [numberOfRecipes, setNumberOfRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://food-recipes-oe00.onrender.com/jsonstore/recipes`);
        const data = await response.json();
        const result = Object.values(data);

        const myRecipes = result.filter((recipe) => recipe.owner._id === id);
        setNumberOfRecipes(myRecipes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
        <div>{username}'s published recipes: {numberOfRecipes.length}</div>
      </div>
    </>
  );
};
export default UserDetails;
