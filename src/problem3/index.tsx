// This code uses stubs/mock implementations for useWalletBalances, usePrices, WalletRow, and classes 
// instead of actual imports. These are placeholders for the purpose of this task and should be replaced with real imports in a production environment.

import React, { useMemo } from 'react';

interface BoxProps {
  className?: string;
  style?: React.CSSProperties;
}

const useWalletBalances = () => {
  return [
    { blockchain: 'Ethereum', currency: 'ETH', amount: 2 },
    { blockchain: 'Arbitrum', currency: 'ARB', amount: 5 },
    { blockchain: 'Osmosis', currency: 'OSMO', amount: 10 },
    { blockchain: 'Neo', currency: 'NEO', amount: 3 },
  ];
};

const usePrices = () => {
  return {
    ETH: 1800,
    ARB: 1.2,
    OSMO: 3.5,
    NEO: 45,
  };
};

const WalletRow: React.FC<{ amount: number; usdValue: number; formattedAmount: string; className: string }> = ({ amount, usdValue, formattedAmount, className }) => {
  return <div className={className}>{/* Content */}</div>;
};

const classes = {
  row: ''
};

interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const getPriority = (blockchain: string): number => {
  const priorities: { [key: string]: number } = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20,
  };
  return priorities[blockchain] || -99;
};

const filterAndSortBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return balances
    .filter(balance => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
};

const formatBalances = (balances: WalletBalance[]): FormattedWalletBalance[] => {
  return balances.map(balance => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const { className, style } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedAndFormattedBalances = useMemo(() => {
    const filteredAndSortedBalances = filterAndSortBalances(balances);
    return formatBalances(filteredAndSortedBalances);
  }, [balances]);

  const rows = sortedAndFormattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={`${balance.currency}-${balance.blockchain}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div className={className} style={style}>
      {rows}
    </div>
  );
};

export default WalletPage;
