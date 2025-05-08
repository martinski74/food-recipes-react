import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import './Details.css';

const Details = () => {
  const auth = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [isAuthor, setIsAuthor] = useState(null);
  const [hasRecommended, setHasRecommended] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}/jsonstore/recipes/${id}`
        );
        const data = await response.json();
        setRecipe(data);
        setIsAuthor(data.owner._id === localStorage.getItem('userId'));
        setHasRecommended(
          data.recommendList.includes(localStorage.getItem('userId'))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
      const res = await fetch(
        `${import.meta.env.VITE_APP_URL}/jsonstore/recipes/` + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token'),
          },
          body: JSON.stringify(updatedRecipe),
        }
      );
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
      <AuthContext.Provider value={auth}>
        {loading ? (
          <div className='loader-details'>
            <Oval
              visible={true}
              height='100'
              width='100'
              secondaryColor='#5b1f51'
              color='#bb86fc'
              strokeWidth='3'
            />
          </div>
        ) : (
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

              <p>Created at: {recipe?.createdAt?.slice(0, 10)} </p>
              <h3>-----------------------------------------------------</h3>

              <h3>People Who Recommend: {recipe?.recommendList?.length}</h3>
              <div className='command'>
                {auth.isLoggedIn && isAuthor && (
                  <Link to={'/edit/' + id}>Edit</Link>
                )}
                {auth.isLoggedIn && isAuthor && (
                  <Link to={'/delete/' + id}>Delete</Link>
                )}

                {hasRecommended && (
                  <p>You've already recommended this recipe!</p>
                )}

                {!hasRecommended && !isAuthor && auth.isLoggedIn && (
                  <span onClick={recommendRecipe}>Recommend</span>
                )}
              </div>
            </article>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
};

export default Details;
