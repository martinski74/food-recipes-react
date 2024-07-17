import { Oval } from 'react-loader-spinner';
import RecipeItem from '../../components/recipes/RecipeItem';
import React, { useState, useEffect } from 'react';
import './CatalogView.css';

const CatalogView = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fechRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3030/jsonstore/recipes');
        const data = await response.json();
        const result = Object.values(data);
        setRecipes(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fechRecipes();
  }, []);
  return (
    <>
      <h3 className='catalog-heading'>Recipe Catalog</h3>
      <div className='loader'>
        <Oval
          visible={loading}
          height='100'
          width='100'
          color='#4fa94d'
          strokeWidth='3'
        />
      </div>
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
