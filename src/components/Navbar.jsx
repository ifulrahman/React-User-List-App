import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navbar-style.css"

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><button onClick={handleLogout}>
        🡰 Logout
        </button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
