import React, { useState, useEffect } from 'react';
import styles from './SearchView.module.css';
import RecipeItem from '../components/recipes/RecipeItem';

const SearchView = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/jsonstore/recipes`
      );
      const data = await response.json();
      const result = Object.values(data);
      setRecipes(result);
      setFilteredRecipes(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) => {
      const searchLower = term.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower)
      );
    });

    setFilteredRecipes(filtered);
  };

  

  return (
    <section className={styles['search-container']}>
      <h2 className={styles['search-header']}>Search Recipes</h2>
      <div className={styles['search-wrapper']}>
        <input
          className={styles['search-input']}
          type='text'
          id='search'
          name='search'
          placeholder='Search for recipes...'
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>
      <div className={styles['search-results']}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredRecipes.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))}
            {filteredRecipes.length === 0 && (
              <p className={styles['no-match']}>No recipes match your search</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchView;
