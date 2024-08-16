import React from 'react';
import './notif-modal-style.css';

const NotificationModal = ({ message, onClose, isSuccess }) => {
  if (!message) return null;

  return (
    <div className="overlay">
      <div className={`modal ${isSuccess ? 'success' : 'error'}`}>
        <p>{message}</p>
        <button onClick={onClose} className="button">Ok</button>
      </div>
    </div>
  );
};

export default NotificationModal;
