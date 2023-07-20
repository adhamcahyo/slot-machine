import React, { useState, useEffect } from 'react';
import SlotLine from './SlotLine';
import Button from './Button';
import Balance from './Balance';
import './SlotMachine.css';

const emojis = ['🍒', '🍊', '🍇', '🍓', '🍉', '🍋'];

const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const SlotMachine = () => {
  const [balance, setBalance] = useState(5000);
  const [bet, setBet] = useState(500);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [slotResults, setSlotResults] = useState(generateInitialResults());
  const [speed, setSpeed] = useState(100);

  function generateInitialResults() {
    const initialResults = [];
    for (let i = 0; i < 3; i++) {
      const lineResults = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];
      initialResults.push(lineResults);
    }
    return initialResults;
  }

  const startSpin = () => {
    setIsAutoSpin(true);
  };

  const stopSpin = () => {
    setIsAutoSpin(false);
  };

  useEffect(() => {
    let interval;

    if (isAutoSpin) {
      interval = setInterval(() => {
        setSlotResults(prevResults =>
          prevResults.map(lineResults => [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()])
        );
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isAutoSpin, speed]);

  useEffect(() => {
    const calculateWin = () => {
      let winAmount = 0;

      slotResults.forEach(lineResults => {
        const [emoji1, emoji2, emoji3] = lineResults;

        if (bet === 500) {
          if (emoji1 === emoji2 && emoji2 === emoji3) {
            winAmount += 100;
          }
        } else if (bet === 1000) {
        } else if (bet === 1500) {
        } else if (bet === 2000) {
        }
      });

      const newBalance = balance + winAmount - bet;
      setBalance(newBalance >= 0 ? newBalance : 0);
    };

    calculateWin();
  }, [slotResults, bet, balance]);

  const handleBetChange = amount => {
    const newBet = bet + amount;
    setBet(newBet >= 0 ? newBet : 0);
  };

  const handleRefreshBalance = () => {
    setBalance(5000);
  };

  return (
    <div className="slot-machine">
      <div className="slot-machine-container">
        <div className="slot-lines-container">
          {slotResults.map((results, index) => (
            <SlotLine key={index} emoji1={results[0]} emoji2={results[1]} emoji3={results[2]} />
          ))}
        </div>
      </div>
      <Button label={isAutoSpin ? 'Stop' : 'Spin'} onClick={isAutoSpin ? stopSpin : startSpin} />
      <Button label="-" onClick={() => handleBetChange(-500)} />
      <Button label="+" onClick={() => handleBetChange(500)} />
      <Balance balance={balance} />
      <Button label="Refresh Balance" onClick={handleRefreshBalance} />
    </div>
  );
};

export default SlotMachine;
