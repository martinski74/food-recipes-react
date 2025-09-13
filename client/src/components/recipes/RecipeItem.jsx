import { Link } from 'react-router-dom';

import styles from './RecipeItem.module.css';

const RecipeItem = ({ recipe }) => {
  return (
    <article className={styles.recipe}>
      <div className={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.details}>
          <span className={styles.time}>45 min</span>
          <span className={styles.servings}>6 servings</span>
          <span className={styles.difficulty}>Medium</span>
        </div>
        <Link to={`/catalog/${recipe._id}`} className={styles.viewRecipe}>View Recipe</Link>
      </div>
    </article>
  );
};

export default RecipeItem;
