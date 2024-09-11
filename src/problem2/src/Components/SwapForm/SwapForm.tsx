import React, { useEffect, useState } from 'react';
import './SwapForm.scss';
import Spinner from '../Spinner/Spinner';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getTokens } from '../Api';

interface Token {
  symbol: string;
  price: number;
  name: string;
}

const IMAGE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';

const SwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedFromToken, setSelectedFromToken] = useState<Token | null>(null);
  const [selectedToToken, setSelectedToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFromList, setShowFromList] = useState<boolean>(false);
  const [showToList, setShowToList] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [fromTokenError, setFromTokenError] = useState<boolean>(false);
  const [toTokenError, setToTokenError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTokens()
      .then(tokenList => setTokens(tokenList))
      .catch(err => setError(err.message));
  }, []);

  const handleSwap = () => {
    setAmountError(!amount);
    setFromTokenError(!selectedFromToken);
    setToTokenError(!selectedToToken);

    if (selectedFromToken && selectedToToken && amount) {
      setLoading(true);
      setError(null);

      setTimeout(() => {
        const fromPrice = selectedFromToken.price;
        const toPrice = selectedToToken.price;
        const exchangeRate = toPrice / fromPrice;
        setResult(Number(amount) * exchangeRate);
        setLoading(false);
      }, 1000);
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleSelectToken = (token: Token, type: 'from' | 'to') => {
    if (type === 'from') {
      setSelectedFromToken(token);
      setShowFromList(false);
      setFromTokenError(false);
    } else {
      setSelectedToToken(token);
      setShowToList(false);
      setToTokenError(false);
    }

    setResult(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setResult(null);
  };

  const handleReset = () => {
    setAmount('');
    setSelectedFromToken(null);
    setSelectedToToken(null);
    setResult(null);
    setAmountError(false);
    setFromTokenError(false);
    setToTokenError(false);
    setError(null);
  };

  return (
    <div className="swap-form">
      {error && <div className="error">{error}</div>}
      <h5>Swap</h5>

      <div className="swap-section">
        <div className="token-select">
          <label htmlFor="from-token">From Token</label>
          <div className={`custom-select ${fromTokenError ? 'error-border' : ''}`}>
            <div
              className="selected"
              onClick={() => setShowFromList(!showFromList)}
            >
              {selectedFromToken ? (
                <>
                  <img src={`${IMAGE_URL}${selectedFromToken.name}.svg`} alt={selectedFromToken.name} />
                  {selectedFromToken.name}
                </>
              ) : (
                <>
                  Select Token
                  <span className="dropdown-icon">
                    {showFromList ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </>
              )}
            </div>
            {showFromList && (
              <ul className="token-list">
                {tokens.map(token => (
                  <li
                    key={token.symbol}
                    onClick={() => handleSelectToken(token, 'from')}
                  >
                    <img src={`${IMAGE_URL}${token.name}.svg`} alt={token.name} />
                    {token.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="token-select">
          <label htmlFor="to-token">To Token</label>
          <div className={`custom-select ${toTokenError ? 'error-border' : ''}`}>
            <div
              className="selected"
              onClick={() => setShowToList(!showToList)}
            >
              {selectedToToken ? (
                <>
                  <img src={`${IMAGE_URL}${selectedToToken.name}.svg`} alt={selectedToToken.name} />
                  {selectedToToken.name}
                </>
              ) : (
                <>
                  Select Token
                  <span className="dropdown-icon">
                    {showToList ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </>
              )}
            </div>
            {showToList && (
              <ul className="token-list">
                {tokens.map(token => (
                  <li
                    key={token.symbol}
                    onClick={() => handleSelectToken(token, 'to')}
                  >
                    <img src={`${IMAGE_URL}${token.name}.svg`} alt={token.name} />
                    {token.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <label htmlFor="input-amount">Amount to send</label>
        <input
          id="input-amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className={amountError ? 'error-border' : ''}
          min="0"
          step="any"
        />
      </div>

      <div className="button-group">
        <button className="confirm" onClick={handleSwap} disabled={loading}>
          {loading ? 'Processing...' : 'Convert'}
        </button>
        <button className="cancel" onClick={handleReset}>Cancel</button>
      </div>

      {loading && <Spinner />}

      {result !== null && (
        <div className="result">
          <div className="amount-to-receive">
            <div>Amount to receive</div>
            <div className="amount">{result.toFixed(2)}</div>
            <div className="token">{selectedToToken?.name}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapForm;
