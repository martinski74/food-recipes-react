import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './Details.css';

const Details = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          'http://localhost:3030/jsonstore/recipes/' + id
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);
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

          <h3>People Who Recommend: 0</h3>
          <div className='command'>
            <Link to={'/edit/' + id}>Edit</Link>
            <Link to={'/delete/' + id}>Delete</Link>

            {/* <p>You've already recommended this recipe!</p>

          <a href='#'>Recommend</a> */}
          </div>
        </article>
      </div>
    </>
  );
};

export default Details;
