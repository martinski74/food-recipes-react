import { Link } from 'react-router-dom';

import styles from './RecipeItem.module.css';

const RecipeItem = ({ recipe }) => {
  return (
    <article className={styles.recipe}>
      <img src={recipe.image} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <Link to={`/catalog/${recipe._id}`}>Read More</Link>
    </article>
  );
};

export default RecipeItem;
