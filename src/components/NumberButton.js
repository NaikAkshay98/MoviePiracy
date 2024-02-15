import React from 'react';
import '../css/NumberButton.css';

const NumberButton = ({ number, isSelected, toggleSelection }) => (
  <button
    className={`number-button ${isSelected ? 'selected' : ''}`}
    onClick={() => toggleSelection(number)}
  >
    {number}
  </button>
);

export default NumberButton;