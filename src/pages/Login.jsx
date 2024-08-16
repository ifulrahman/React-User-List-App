import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NotificationModal from '../components/NotificationModal';
import './login-style.css'; 
import userImage from '../assets/user-bg.avif';
import appImage from '../assets/app-play-store.png'

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      setNotification('Login successful! ✅');
      setTimeout(() => {
        setNotification('');
        navigate('/home');
      }, 2000);
    } else {
      setNotification('Login failed. Please try again. ❌');
    }
  };

  return (
    <div className="login-general">
      <div className="login-container">
        <div className="image-section">
          <img src={userImage} alt="Login" />
        </div>
        <div className="form-section">
          <h1>Login</h1>
          <p>Login with your account</p>
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
            <button type="submit" className="submit-button">Login</button>
          </form>
          <NotificationModal message={notification} onClose={() => setNotification('')} />
          <div className="sign-in-link">
            <p>Not a member yet? <Link to="/register">Create One</Link></p>
          </div>
          <div className='store-logo'>
            <img src={appImage} alt="" style={{ width: '200px', height: 'auto', marginLeft: '100px' }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
