import React from 'react';

interface CurrencyInputProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ id, value, onChange, placeholder }) => {
  return (
    <input
      id={id}
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CurrencyInput;