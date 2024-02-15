import React, { useState } from 'react';
import Header from './Header.js';
import NumberButton from './NumberButton.js';
import MoneyButton from './MoneyButton.js';
import SelectedNumbers from './SelectedNumbers.js';
import '../css/App.css';

const MAX_SELECTION = 5;

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  
  const handleToggleSelection = (number) => {
    setSelectedNumbers((prevSelectedNumbers) => {
      
      if (prevSelectedNumbers.includes(number)) {
        
        return prevSelectedNumbers.filter(n => n !== number);
      } else {
        
        if (prevSelectedNumbers.length >= MAX_SELECTION) {
          alert('You cannot select more than 5 numbers.');
          return prevSelectedNumbers;
        }
        
        return [...prevSelectedNumbers, number];
      }
    });
  };
  
  const handleAssignMoney = (amount) => {
    if (selectedNumbers.length === MAX_SELECTION) {
      
      setTotalMoney((prevTotalMoney) => prevTotalMoney + amount);
    } else {
      alert('You must select 5 numbers before assigning money.');
    }
  };

  const handleCashOut = () => {
    if (selectedNumbers.length === 5 && totalMoney > 0) {
      
      alert(`Cashing out $${totalMoney.toFixed(2)} for numbers: ${selectedNumbers.join(', ')}`);
      
    } else if (selectedNumbers.length !== 5) {
      alert('Please select exactly 5 numbers before cashing out.');
    } else {
      alert('Cannot cash out for $0. Please assign a money value.');
    }
  };

  const handleClear = () => {
    
    setSelectedNumbers([]);
    setTotalMoney(0);
  };

  const clearMoney = () => {
    setTotalMoney(0);
  };

  const handleRandomSelection = () => {
    const maxNumbers = 20;
    let randomNumbers = [];
    while (randomNumbers.length < 5) {
      let randomNumber = Math.floor(Math.random() * maxNumbers) + 1;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    setSelectedNumbers(randomNumbers);
  };

  return (

    <div>
    
    <div>
      <Header />  
    </div>  
      
    <div className="app-container">
    
    
      

      <div className="money-buttons left-panel">
        {[1, 5, 10, 20].map((amount) =>
          <MoneyButton
            key={amount}
            amount={amount}
            assignMoney={handleAssignMoney}
          />
        )}
        
      </div>

      <div className="number-buttons center-panel">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) =>
          <NumberButton
            key={number}
            number={number}
            isSelected={selectedNumbers.includes(number)}
            toggleSelection={handleToggleSelection}
          />
        )}
        <div>
          <button className="app-button random-button" onClick={handleRandomSelection}>RANDOM</button>
          <button className="app-button cash-button" onClick={handleCashOut}>CASH</button>
          <button className="app-button clear-button" onClick={handleClear}>CLEAR</button>
        </div>
        
        
      </div>
      
      

      <div className="right-panel">
        <SelectedNumbers 
         numbers={selectedNumbers} 
         totalMoney={totalMoney}
         onClearMoney={clearMoney}
         />
      </div>
      
    </div>
    
        
      
    </div>
  );
};





export default App;
