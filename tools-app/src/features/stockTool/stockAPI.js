

const apiKey = 'KVEcZNP4hqKp8sFtIZDDKzsNGPlwtpvX';

export async function fetchStock(stockSymbol) {
  const url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0];
}

