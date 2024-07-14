import { write } from "bun";
import instruments from "./instruments.json";

interface Instrument {
  ticker: string;
  ref: string;
  type: string;
  id: string;
  isin?: string;
  mic: string;
  exchange: string;
  currency: string;
  name: string;
  uic: number;
  quantityDecimalPlaces: number;
  createdDate: number;
  sortOrder?: number;
  tradeable: boolean;
  allSymbols: string[];
  requiredProducts: string[][];
  currentSymbol: string;
  baseCurrency: string;
  state: string;
  shortOverview?: string;
  stateDetails: StateDetails;
  underlyingCurrency?: string;
  typeSpecificProperties?: TypeSpecificProperties;
}

interface TypeSpecificProperties {
  type: string;
  complexFinancialInstrument: boolean;
  taxExemption: string[];
}

interface StateDetails {
  name: string;
  canBuy: boolean;
  canSell: boolean;
  canView: boolean;
}

const toTicker = ({ ticker }: Instrument) => ticker;

const validState = ({ canBuy, canSell, canView }: StateDetails) =>
  canBuy && canSell && canView;

await write(
  "./tickers.json",
  JSON.stringify(
    (instruments as Instrument[])
      .filter(
        ({ currency, type, stateDetails }) =>
          currency === "USD" && type === "EQUITY" && validState(stateDetails)
      )
      .map(toTicker)
  )
);
