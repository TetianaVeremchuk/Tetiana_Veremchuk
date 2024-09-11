import React from 'react';

interface CurrencySelectProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ id, value, onChange, options }) => {
  return (
    <select id={id} value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;