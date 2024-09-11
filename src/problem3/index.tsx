// This code uses stubs/mock implementations for useWalletBalances, usePrices, useMemo, WalletRow, and classes 
// instead of actual imports. These are placeholders for the purpose of this task and should be replaced with real imports in a production environment.

interface BoxProps {
  className?: string;
  style?: {};
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

const useMemo = (fn: Function, deps: any[]) => {
  return fn();
};

const WalletRow = (props: any) => {
  return <div>{/* Content */}</div>;
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

const WalletPage = (props: BoxProps) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => 
        getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => 
        getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      )
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = sortedAndFormattedBalances.map((balance: FormattedWalletBalance) => {
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
    <div {...rest}>
      {rows}
    </div>
  );
};
