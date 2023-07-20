import React from 'react';

const Balance = ({ balance }) => {
  return (
    <div className="balance">
      Saldo: Rp. {balance.toLocaleString()}
    </div>
  );
};

export default Balance;
