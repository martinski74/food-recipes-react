import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './CreateRecipe.module.css';
const CreateRecipe = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [input, setInput] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
    recommendList: [],
    owner: { _id: userId },
    createdAt: new Date().toISOString(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3030/jsonstore/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        toast.success('Successfully created recipe!');
        navigate('/catalog');
      } else {
        toast.error(res.statusText);
      }
      console.log(res);

      setInput({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        image: '',
      });
    } catch (error) {
      console.log('Error ', error);
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <main className={styles.create}>
      <section id='create'>
        <div className={styles.form}>
          <h2>Add Recipe</h2>
          <form className={styles['create-form']} onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Recipe Title'
              onChange={handleChange}
              value={input.title}
            />
            <textarea
              type='text'
              name='description'
              placeholder='Description'
              onChange={handleChange}
              value={input.description}
            ></textarea>
            <textarea
              type='text'
              name='ingredients'
              placeholder='Ingredients'
              onChange={handleChange}
              value={input.ingredients}
            ></textarea>
            <textarea
              type='text'
              name='instructions'
              placeholder='instructions'
              onChange={handleChange}
              value={input.instructions}
            ></textarea>
            <input
              type='url'
              name='image'
              placeholder='Image url'
              onChange={handleChange}
              value={input.image}
            />

            <button type='submit'>Create Recipe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateRecipe;
