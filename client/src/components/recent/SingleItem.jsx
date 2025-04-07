import { Link } from 'react-router-dom';
import styles from './SingleItem.module.css';
const SingleItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <img className={styles.image} src={item.image} />
      <p>{item.title}</p>

      <Link className={styles['details-btn']} to={`/catalog/${item._id}`}>
        Details
      </Link>
    </div>
  );
};

export default SingleItem;
