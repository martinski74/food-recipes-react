import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './DeleteRecipe.module.css';
const DeleteRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
  });
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          'http://localhost:3030/jsonstore/recipes/' + id
        );
        const data = await response.json();
        setInput(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3030/jsonstore/recipes/' + id, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Successfully deleted recipe!', { autoClose: 2000 });
        navigate('/catalog');
      } else {
        toast.error(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.create}>
      <section id='create'>
        <div className={styles.form}>
          <h2>Delete Recipe</h2>
          <form className={styles['create-form']} onSubmit={handleDelete}>
            <input
              type='text'
              name='title'
              placeholder='Recipe Title'
              defaultValue={input.title}
              disabled
            />
            <textarea
              type='text'
              name='description'
              placeholder='Description'
              defaultValue={input.description}
              disabled
            ></textarea>
            <textarea
              type='text'
              name='ingredients'
              placeholder='Ingredients'
              defaultValue={input.ingredients}
              disabled
            ></textarea>
            <textarea
              type='text'
              name='instructions'
              placeholder='instructions'
              defaultValue={input.instructions}
              disabled
            ></textarea>
            <input
              type='url'
              name='image'
              placeholder='Image url'
              defaultValue={input.image}
              disabled
            />

            <button type='submit'>Delete Recipe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default DeleteRecipe;
