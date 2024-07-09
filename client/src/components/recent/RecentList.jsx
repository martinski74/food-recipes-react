import SingleItem from './SingleItem';
import { useState, useEffect } from 'react';
import styles from './RecentList.module.css';

const RecentList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3030/jsonstore/recipes');
        const data = await response.json();
        const result = Object.values(data).slice(0, 3);
        setItems(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);
  return (
    <>
      {items && items.map((item) => <SingleItem key={item._id} item={item} />)}
      {items.length === 0 && (
        <p className={styles['no-post']}>There are no recipes!</p>
      )}
    </>
  );
};

export default RecentList;
