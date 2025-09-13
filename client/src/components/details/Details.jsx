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
              <div className='recipe-image'>
                <img src={recipe?.image} alt={recipe?.title} />
              </div>
              
              <div className='recipe-content'>
                <h2 className='recipe-title'>{recipe?.title}</h2>
                <p className='recipe-description'>{recipe?.description}</p>
                
                <div className='recipe-stats'>
                  <div className='stat'>
                    <span className='stat-icon'>⏰</span>
                    <span className='stat-value'>45 min</span>
                    <span className='stat-label'>Cook Time</span>
                  </div>
                  <div className='stat'>
                    <span className='stat-icon'>👥</span>
                    <span className='stat-value'>4-6</span>
                    <span className='stat-label'>Servings</span>
                  </div>
                  <div className='stat'>
                    <span className='stat-icon'>❤️</span>
                    <span className='stat-value'>{recipe?.recommendList?.length}</span>
                    <span className='stat-label'>Recommends</span>
                  </div>
                </div>

                <div className='recipe-ingredients'>
                  <h3>📝 Ingredients</h3>
                  <p>{recipe?.ingredients}</p>
                </div>

                <div className='recipe-instructions'>
                  <h3>👨‍🍳 Instructions</h3>
                  <p>{recipe?.instructions}</p>
                </div>

                <div className='recipe-meta'>
                  <p className='created-at'>Created: {recipe?.createdAt?.slice(0, 10)}</p>
                </div>

                <div className='recipe-actions'>
                  {auth.isLoggedIn && isAuthor && (
                    <div className='author-actions'>
                      <Link to={`/edit/${recipe._id}`} className='edit-btn'>✏️ Edit</Link>
                      <Link to={`/delete/${recipe._id}`} className='delete-btn'>🗑️ Delete</Link>
                    </div>
                  )}
                  {!hasRecommended && !isAuthor && auth.isLoggedIn && (
                    <button
                      onClick={recommendRecipe}
                      className='recommend-btn'
                    >
                      🤍 Recommend
                    </button>
                  )}
                  {hasRecommended && (
                    <button
                      className='recommend-btn recommended'
                      disabled
                    >
                      ❤️ Recommended
                    </button>
                  )}
                </div>
              </div>
            </article>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
};

export default Details;
