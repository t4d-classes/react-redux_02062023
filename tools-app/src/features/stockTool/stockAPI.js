

const apiKey = '9wh_hnZyq5QeRasXBWI5gxmExVR3zo_h';

export async function fetchStock(stockSymbol) {
  const url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0];
}

