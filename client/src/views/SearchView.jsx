import React, { useState, useEffect } from 'react';
import styles from './SearchView.module.css';
import RecipeItem from '../components/recipes/RecipeItem';
const SearchView = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
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

  useEffect(() => {
    fechRecipes();
  }, []);
  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchVal === '') {
      fechRecipes();
    }

    const filteredRecipes = recipes.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchVal.toLowerCase())) {
        return recipe;
      }
    });
    setRecipes(filteredRecipes);

    setSearchVal('');
  };

  return (
    <section className={styles['search-container']}>
      <h2 className={styles['search-header']}>Search Recipes</h2>
      <form onSubmit={handleSearch}>
        <input
          className={styles['search-input']}
          type='text'
          id='search'
          name='search'
          placeholder='Search for recipes...'
          onChange={handleChange}
          value={searchVal}
        />
        <button className={styles['search-button']} type='submit'>
          Search
        </button>
      </form>
      <div className={styles['search-results']}>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeItem key={recipe._id} recipe={recipe} />
          ))}
        {recipes.length === 0 && (
          <p className={styles['no-match']}>There are no recipes found yet!</p>
        )}
      </div>
    </section>
  );
};

export default SearchView;
