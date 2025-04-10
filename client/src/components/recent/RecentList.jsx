import SingleItem from './SingleItem';
import { useState, useEffect } from 'react';
import styles from './RecentList.module.css';

const RecentList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://food-recipes-oe00.onrender.com/jsonstore/recipes');
        const data = await response.json();
        const result = Object.values(data);
        setItems(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  const sortedItems = items.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <>
      {items &&
        sortedItems
          .slice(0, 3)
          .map((item) => <SingleItem key={item._id} item={item} />)}
      {items.length === 0 && (
        <p className={styles['no-post']}>There are no recipes!</p>
      )}
    </>
  );
};

export default RecentList;
