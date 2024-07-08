import tickers from "./tickers.json";
import headers from "./headers.json";

const url = "https://trade.revolut.com/api/retail/instruments/tickers";

const res = await fetch(url, {
  method: "POST",
  headers,
  body: JSON.stringify(tickers),
});

const result = await res.json();

console.log(result.length, result[result.length - 1]);
