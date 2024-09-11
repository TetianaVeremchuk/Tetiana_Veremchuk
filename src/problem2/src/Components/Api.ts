import axios from 'axios';

const API_URL = 'https://interview.switcheo.com/prices.json';

interface Token {
  symbol: string;
  price: number;
  name: string;
}

export const getTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(API_URL);
    const tokenList = Object.keys(response.data).map(key => ({
      symbol: key,
      price: response.data[key].price,
      name: response.data[key].currency || key,
    }));

    const uniqueTokens = Array.from(new Map(tokenList.map(token => [token.name, token])).values());
    return uniqueTokens;
  } catch (error) {
    throw new Error('Failed to load token prices.');
  }
};
