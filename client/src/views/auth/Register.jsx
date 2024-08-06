import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Register.module.css';
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!input.username) {
      newErrors.username = 'Username is required';
    }

    if (!input.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!input.password) {
      newErrors.password = 'Password is required';
    } else if (input.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    if (!input.repass) {
      newErrors.repass = 'Repeat password is required';
    } else if (input.repass !== input.password) {
      newErrors.repass = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok && response.status == 409) {
        throw new Error('A user with the same email already exists');
      }

      setInput({
        username: '',
        email: '',
        password: '',
        repass: '',
      });

      toast.success('Successfully registered!', { autoClose: 2000 });
      navigate('/login');
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    setInput({
      ...input,
      profilePicture: URL.createObjectURL(file),
    });
  };

  return (
    <main className={styles.register}>
      <section id='register'>
        <div className={styles.form}>
          <h2>Register</h2>
          <form className={styles['login-form']} onSubmit={handleSubmit}>
            <input
              style={errors.username ? { border: '2px solid red' } : {}}
              type='text'
              name='username'
              placeholder='username *'
              onChange={handleChange}
              defaultValue={input.username}
            />

            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
            <input
              style={errors.email ? { border: '2px solid red' } : {}}
              type='email'
              name='email'
              placeholder='email *'
              onChange={handleChange}
              defaultValue={input.email}
            />

            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              style={errors.password ? { border: '2px solid red' } : {}}
              type='password'
              name='password'
              placeholder='password *'
              autoComplete='on'
              onChange={handleChange}
              defaultValue={input.password}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <input
              style={errors.repass ? { border: '2px solid red' } : {}}
              type='password'
              name='repass'
              placeholder='repeat password'
              autoComplete='on'
              onChange={handleChange}
              defaultValue={input.repass}
            />

            {errors.repass && <p className={styles.error}>{errors.repass}</p>}

            <label htmlFor='userImage'>Upload profile image (optional)</label>
            <input
              type='file'
              name='userImage'
              id='userImage'
              placeholder='Upload Image'
              onChange={handleUpload}
            />

            <button type='submit'>Register</button>
            <p className={styles.message}>
              Already registered? <Link to={'/login'}>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Register;
