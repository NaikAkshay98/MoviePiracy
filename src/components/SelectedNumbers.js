import React from 'react';

import '../css/SelectedNumbers.css';

const SelectedNumbers = ({ numbers, totalMoney, onClearMoney  }) => (
  <div className="selected-numbers">
    <h3>Numbers Selected:</h3>
    {numbers.map((number, index) => (
      <p key={index}>Mark: {number}</p>
    ))}
    <div className="total-money">Total: ${totalMoney.toFixed(2)}</div>
    {totalMoney > 0 && ( 
        <button onClick={onClearMoney} className="clear-money-button app-button">Clear Money</button>
      )}
  </div>
);

export default SelectedNumbers;