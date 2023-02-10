

const apiKey = '9wh_hnZyq5QeRasXBWI5gxmExVR3zo_h';

export async function fetchStock(stockSymbol) {
  const url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0];
}

export async function fetchWatchList(stockListName) {
  const url =
    'http://localhost:3060/stockWatchLists?name=' +
    encodeURIComponent(stockListName);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function saveWatchList(stockWatchList) {
  const url =
    'http://localhost:3060/stockWatchLists/' +
    encodeURIComponent(stockWatchList.id);
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockWatchList),
  });
}

export async function fetchStocks(stockSymbols) {
  return Promise.all(
    stockSymbols.map((stockSymbol) => fetchStock(stockSymbol)),
  );
}
