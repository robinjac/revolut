import tickers from "./tickers.json"
import headers from "./headers.json";


interface TickerResult {
  type: string;
  instrument: string;
  ref: string;
  last: number;
  lastPrecise: string;
  previous: number;
  previousPrecise: string;
  previousClose: number;
  previousClosePrecise: string;
  lastClose: number;
  lastClosePrecise: string;
  currency: string;
  highlyVolatile: boolean;
  status: string;
  tradingSession: string;
  nextOpenUtcTimestamp: number;
  updatedAt: number;
  tickerType: string;
}

const url = "https://trade.revolut.com/api/retail/instruments/tickers";

const res = await fetch(url, {
  method: "POST",
  headers,
  body: JSON.stringify(tickers),
});

const result: TickerResult[] = await res.json();

const selection = result
  .sort(({ last, previous }) => last - previous)
  .slice(0, 10);

console.log(selection);
