import React, { useState, useEffect } from 'react';
import SlotLine from './SlotLine';
import Button from './Button';
import Balance from './Balance';
import './SlotMachine.css';

const SlotMachine = () => {
  const [balance, setBalance] = useState(5000);
  const [bet, setBet] = useState(500);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [slotResults, setSlotResults] = useState([
    [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
    [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
    [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
  ]);
  const [speed, setSpeed] = useState(100);
  const emojis = ['🍒', '🍊', '🍇', '🍓', '🍉', '🍋'];

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const startSpin = () => {
    setIsAutoSpin(true);
  };

  const stopSpin = () => {
    setIsAutoSpin(false);
    setSlotResults([
      [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
      [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
      [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()],
    ]);
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

      setBalance(prevBalance => prevBalance + winAmount - bet);
    };

    calculateWin();
  }, [slotResults, bet]);

  const handleBetChange = amount => {
    setBet(prevBet => prevBet + amount);
  };

  const handleRefreshBalance = () => {
    setBalance(5000);
  };

  return (
    <div className="slot-machine">
      <div className="slot-lines-container">
        {slotResults.map((results, index) => (
          <SlotLine key={index} emoji1={results[0]} emoji2={results[1]} emoji3={results[2]} />
        ))}
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
