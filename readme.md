# My Project

## Task 1: Summation to N

### Project Description
The goal of this task was to provide three unique implementations of a function that calculates the summation of all integers from 1 to a given integer `n`. The function ensures that the input is an integer that will produce a result lesser than `Number.MAX_SAFE_INTEGER`.

### Implementations
1. Iterative approach using a loop.
2. Mathematical formula to calculate the sum.
3. Recursive approach to achieve the same result.

## Task 2: Swap Token Application

### Project Description
Swap Token Application is a web application for exchanging cryptocurrencies, where users can select tokens for exchange, input an amount, and see the conversion result based on current prices. The project is built using React and utilizes TypeScript for component typing, as well as SCSS for styling the interface.

### Technology Stack
- **React**: For building the user interface and managing state.
- **TypeScript**: For static typing and increased code reliability.
- **Axios**: For making HTTP requests to the API to retrieve current token prices.
- **SCSS**: For modular and flexible styling of components.
- **React Icons**: Used to display icons in the dropdown menu.
- **Create React App**: Used to bootstrap the project.

### Functionality
- **Token Selection**: Users can select tokens for exchange from a list of available tokens.
- **Token Conversion**: Calculates results based on current exchange rates.
- **Asynchronous Data Loading**: Retrieves current token price data from the API.
- **Field Validation**: Ensures all necessary fields are filled before performing the exchange.
- **Error Handling**: Displays errors if any fields are left empty or if data loading from the API fails.

### Demo
You can view the live demo of the Swap Token Application [DEMO](https://tetianaveremchuk.github.io/Tetiana_Veremchuk/).

## Task 3: Computational Inefficiencies in React Code

### Identified Issues
1. **Inefficient useMemo Usage**: The `sortedBalances` computation within `useMemo` is inefficient because it combines filtering and sorting in one step, making the logic complex and hard to maintain. Additionally, `prices` аre included in the `useMemo` dependencies, even though they are not used in computing `sortedBalances`, which can cause unnecessary recomputation when prices change.

2. **Suboptimal Filtering and Sorting**: The filter logic checks if `balance.amount` is less than or equal to 0, which contradicts the purpose of `sortedBalances`. If the amount is zero or negative, it should ideally not be included in the sorted balances. Filtering and sorting could be combined more efficiently, reducing overall complexity.

3. **Incorrect Variable Reference**: The filter function references a non-existent variable `lhsPriority`. This should be `balancePriority`.

4. **Redundant Mapping**: The `formattedBalances` mapping is redundant since it duplicates the data, adding only a formatted string. This could be done inline or combined with `sortedBalances` to streamline the code.

5. **Improper Key Usage**: Using `index` as a key in the rows array can lead to issues with component re-rendering, especially when the list order changes. A more stable key should be used.

6. **Lack of Type Safety**: The `blockchain` parameter in `getPriority` is typed as `any`, which defeats the purpose of TypeScript, as it allows potential type-related errors to slip through.
