import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserDetail from '../pages/UserDetail';
import ProtectedRoute from './ProtectedRoute';
import Navbar from '../components/Navbar';
import Landing from '../pages/Landing';

const RouteList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><><Navbar /><Home /></></ProtectedRoute>} />
        <Route path="/detail-user/:id" element={<ProtectedRoute><><Navbar /><UserDetail /></></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default RouteList;
