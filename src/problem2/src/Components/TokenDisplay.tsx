import React from 'react';

interface TokenProps {
  token: {
    name: string;
    symbol: string;
    price: number;
  };
}

const TokenDisplay: React.FC<TokenProps> = ({ token }) => {
  return (
    <div className="token-display">
      <h3>{token.name}</h3>
      <p>Symbol: {token.symbol}</p>
      <p>Price: ${token.price.toFixed(2)}</p>
    </div>
  );
};

export default TokenDisplay;
