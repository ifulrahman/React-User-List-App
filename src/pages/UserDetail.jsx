import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './userDetail-style.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(`https://reqres.in/api/users/${id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data.data);
          setLoading(false); 
        });
    }, 1000);
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="user-detail-card">
      <img src={user.avatar} alt={user.first_name} className="user-avatar" />
      <div className="user-info">
        <h1>{user.first_name} {user.last_name}</h1>
        <p className="user-email">{user.email}</p>
        <p className="user-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas unde, aliquam distinctio repellat nemo ipsam adipisci quia dolorem excepturi labore praesentium ad eaque quaerat doloribus nesciunt maxime id tempora beatae pariatur sed exercitationem quasi dolorum. Quidem, quis suscipit aliquam quam necessitatibus, non harum corporis sequi, officia ratione accusamus! Fuga, maxime?
        </p>
        <button className="back-button" onClick={() => navigate('/home')}> ⇦ Back</button>
      </div>
    </div>
  );
};

export default UserDetail;