import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './Details.css';

const Details = () => {
  const auth = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [isAuthor, setIsAuthor] = useState(null);
  const [hasRecommended, setHasRecommended] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          'http://localhost:3030/jsonstore/recipes/' + id
        );
        const data = await response.json();
        setRecipe(data);
        setIsAuthor(data.owner._id === localStorage.getItem('userId'));
        setHasRecommended(
          data.recommendList.includes(localStorage.getItem('userId'))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);

  const recommendRecipe = async () => {
    const updatedRecipe = {
      ...recipe,
      recommendList: [...recipe.recommendList, localStorage.getItem('userId')],
    };
    try {
      const res = await fetch('http://localhost:3030/jsonstore/recipes/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedRecipe),
      });
      if (res.ok) {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          recommendList: [
            ...recipe.recommendList,
            localStorage.getItem('userId'),
          ],
        }));

        setHasRecommended(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='content'>
        <article className='recipe-detail'>
          <img src={recipe?.image} alt='Spaghetti Carbonara' />

          <h2>{recipe?.title}</h2>
          <p>{recipe?.description}</p>
          <h3>-----------------------------------------------------</h3>
          <h3>Ingredients:</h3>
          <p>{recipe?.ingredients}</p>

          <h3>-----------------------------------------------------</h3>

          <h3>Instructions:</h3>
          <p>{recipe?.instructions}</p>

          <h3>-----------------------------------------------------</h3>

          <h3>People Who Recommend: {recipe?.recommendList.length}</h3>
          <div className='command'>
            {auth.isLoggedIn && isAuthor && (
              <Link to={'/edit/' + id}>Edit</Link>
            )}
            {auth.isLoggedIn && isAuthor && (
              <Link to={'/delete/' + id}>Delete</Link>
            )}

            {hasRecommended && <p>You've already recommended this recipe!</p>}

            {!hasRecommended && !isAuthor && (
              <span onClick={recommendRecipe}>Recommend</span>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default Details;
