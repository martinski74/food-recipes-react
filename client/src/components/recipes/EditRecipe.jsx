import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './CreateRecipe.module.css';
const EditRecipe = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3030/jsonstore/recipes/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (res.ok) {
        toast.success('Successfully updated recipe!', { autoClose: 2000 });
        navigate('/catalog');
      } else {
        toast.error(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.create}>
      <section id='create'>
        <div className={styles.form}>
          <h2>Edit Recipe</h2>
          <form className={styles['create-form']} onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Recipe Title'
              defaultValue={input.title}
              onChange={handleChange}
            />
            <textarea
              type='text'
              name='description'
              placeholder='Description'
              defaultValue={input.description}
              onChange={handleChange}
            ></textarea>
            <textarea
              type='text'
              name='ingredients'
              placeholder='Ingredients'
              defaultValue={input.ingredients}
              onChange={handleChange}
            ></textarea>
            <textarea
              type='text'
              name='instructions'
              placeholder='instructions'
              defaultValue={input.instructions}
              onChange={handleChange}
            ></textarea>
            <input
              type='url'
              name='image'
              placeholder='Image url'
              defaultValue={input.image}
              onChange={handleChange}
            />

            <button type='submit'>Edit Recipe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditRecipe;
