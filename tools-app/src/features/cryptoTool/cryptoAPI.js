export async function fetchCoin(coinName) {
  const coinNameLowerCase = coinName.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinNameLowerCase}&vs_currencies=usd`;
  const res = await fetch(url);
  const data = await res.json();
  return data[coinNameLowerCase].usd; // return price for coin
}