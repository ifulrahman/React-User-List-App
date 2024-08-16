import React from 'react';
import { Link } from 'react-router-dom';
import './landing-style.css';
import appImage from '../assets/app-play-store.png'

const Landing = () => {
  return (
    <div className="landing-general">
      <div className="landing-page">
        <div className="container">
          <div className="welcome-section">
            <h1>Welcome to the <br /> User List App</h1>
            <p>Access comprehensive user profiles with just one click. Sign up in seconds and start managing users right away. Easily integrate with other platforms and tools.</p>
            <div className="buttons">
              <Link to="/login">Login</Link>
            </div>
            <div className='sign-up-account'>
              <p>Need an account? <Link to="/register" className="create-one-link">Create One</Link></p>
            </div>
            <div>
              <img src={appImage} alt="" style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div className="footer">
              <p>Designed by <i>Muhammad Syaiful Rahman</i></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
