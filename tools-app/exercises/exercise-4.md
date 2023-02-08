# Exercise 4

1. In the `CyptoTool` feature, create a new file named `cryptoAPI.js`. Add the following code to the file.

```javascript
export async function fetchCoin(coinSymbol) {
  const url `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbol}&vs_currencies=usd`;
  const res = await fetch(url);
  const data = await res.json();
  return data[coinSymbol];
}
```

2. Following the example of the `StockTool` feature, update the `CyptoTool` tool component to lookup the current coin price and display it in the `Card` component. Style it as you would like.

3. Ensure it works!