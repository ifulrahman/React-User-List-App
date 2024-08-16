import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NotificationModal from '../components/NotificationModal';
import './register-style.css';
import bgImage from '../assets/hp.avif';
import appImage from '../assets/app-play-store.png'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        setNotification('Registration successful! Please login. ✅');
        setTimeout(() => {
          setNotification('');
          navigate('/login');
        }, 2000);
      } else {
        setNotification('Registration failed. Please try again. ❌');
      }
    })
    .catch(() => {
      setNotification('An error occurred. Please try again later. ❌');
    });
  };

  return (
    <div className="register-style">
      <div className="register-container">
        <div className="form-section">
          <h1>Sign up</h1>
          <p>Sign up to enjoy the User List app</p>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`input-field ${errors.email ? 'error-input' : ''}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                className={`input-field ${errors.password ? 'error-input' : ''}`}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <button type="submit" className="submit-button">Sign up</button>
          </form>
          <NotificationModal message={notification} onClose={() => setNotification('')} />
          <div className="sign-in-link">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
          <div className='store-logo'>
            <img src={appImage} alt="" style={{ width: '200px', height: 'auto', marginLeft: '100px' }}/>
          </div>
        </div>
        <div className="image-section">
          <img src={bgImage} alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
