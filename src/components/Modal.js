import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      
    </div>
  );
};

export default Modal;
