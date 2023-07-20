import React from 'react';

const SlotLine = ({ emoji1, emoji2, emoji3 }) => {
  return (
    <div className="slot-line">
      <span>{emoji1}</span>
      <span>{emoji2}</span>
      <span>{emoji3}</span>
    </div>
  );
};

export default SlotLine;
