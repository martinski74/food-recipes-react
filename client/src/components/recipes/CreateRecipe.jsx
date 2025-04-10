import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import styles from './CreateRecipe.module.css';
const CreateRecipe = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
  });

  let validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients is required'),
    instructions: Yup.string().required('Instructions is required'),
    image: Yup.string().url().required('Image is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(input, {
        abortEarly: false,
      });
      let payload = {
        ...input,
        recommendList: [],
        owner: { _id: userId },
        createdAt: new Date().toISOString(),
      };
      const res = await fetch('https://food-recipes-oe00.onrender.com/jsonstore/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Successfully created recipe!', { autoClose: 2000 });
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
      const newErrors = {};

      error.inner.map((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
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
            {errors.title && <p className={styles.error}>{errors.title}</p>}
            <textarea
              type='text'
              name='description'
              placeholder='Description'
              onChange={handleChange}
              value={input.description}
            ></textarea>
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
            <textarea
              type='text'
              name='ingredients'
              placeholder='Ingredients'
              onChange={handleChange}
              value={input.ingredients}
            ></textarea>
            {errors.ingredients && (
              <p className={styles.error}>{errors.ingredients}</p>
            )}
            <textarea
              type='text'
              name='instructions'
              placeholder='Instructions'
              onChange={handleChange}
              value={input.instructions}
            ></textarea>
            {errors.instructions && (
              <p className={styles.error}>{errors.instructions}</p>
            )}
            <input
              type='url'
              name='image'
              placeholder='Image url'
              onChange={handleChange}
              value={input.image}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}

            <button type='submit'>Create Recipe</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateRecipe;
