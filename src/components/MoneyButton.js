import React from 'react';
import '../css/MoneyButton.css';

const MoneyButton = ({ amount, assignMoney }) => (
  <button className="money-button" onClick={() => assignMoney(amount)}>
    ${amount}
  </button>
);

export default MoneyButton;
