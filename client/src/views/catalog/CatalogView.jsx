import { Link } from 'react-router-dom';
import RecipeItem from '../../components/recipes/RecipeItem';
import React, { useState, useEffect } from 'react';
import './CatalogView.css';

const CatalogView = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fechRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3030/jsonstore/recipes');
        const data = await response.json();
        const result = Object.values(data);
        setRecipes(result);
      } catch (error) {
        console.log(error);
      }
    };
    fechRecipes();
  }, []);
  return (
    <>
      <h3>Recipe Catalog</h3>
      <section className='recipes'>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeItem key={recipe._id} recipe={recipe} />
          ))}

        {/* <article className='recipe'>
          <img src='https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg' />
          <h3>Spagetti Carbonara</h3>
          <p>
            A class Italian pasta dish made with eggs, cheese, pancetta, and
            pepper.
          </p>
          <Link to='/catalog/1'>Read More</Link>
        </article>
        <article className='recipe'>
          <img src='https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg' />
          <h3>Spagetti Carbonara</h3>
          <p>
            A classNameic Italian pasta dish made with eggs, cheese, pancetta,
            and pepper.
          </p>
          <a href='#'>Read More</a>
        </article>
        <article className='recipe'>
          <img src='https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg' />
          <h3>Spagetti Carbonara</h3>
          <p>
            A classNameic Italian pasta dish made with eggs, cheese, pancetta,
            and pepper.
          </p>
          <a href='#'>Read More</a>
        </article> */}

        {!recipes && <p className='no-post'>There are no recipes found yet!</p>}
      </section>
    </>
  );
};
export default CatalogView;
