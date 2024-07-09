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
      <h3 className='catalog-heading'>Recipe Catalog</h3>
      <section className='recipes'>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeItem key={recipe._id} recipe={recipe} />
          ))}

        {!recipes && <p className='no-post'>There are no recipes found yet!</p>}
      </section>
    </>
  );
};
export default CatalogView;
