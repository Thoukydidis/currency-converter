//TODO this is an existing endpoint from the api provider but for a paid plan. by upgrading the plan it can be used the below end point to satisfy directly the needs of our requirements
// https://exchangeratesapi.io/documentation/  (under the Convert Endpoint section)

import { FailedReturn } from "./interfaces";

const BASE_URL = process.env.REACT_EXCHANGE_RATES_BASE_URL ?? "";

const API_KEY = process.env.REACT_EXCHANGE_RATES_API_KEY ?? "";

export type API<T> = (params: {
  endpoint: string;
  params: T;
}) => Promise<Response | FailedReturn>;

type FetchConvertedRates = {
  from?: string;
  to?: string;
  amount?: string;
};

const api: API<FetchConvertedRates> = ({ endpoint, params = {} }) => {
  const searchParams = new URLSearchParams(params);
  searchParams.append("access_key", API_KEY);
  const queryString = searchParams.toString();

  return fetch(`${BASE_URL}${endpoint}?${queryString}`);
};

export const fetchConvertedRates = async (
  fromCurrency: string,
  toCurrency: string,
  amount: string
) => {
  try {
    const response = await api({
      endpoint: "/convert",
      params: { from: fromCurrency, to: toCurrency, amount },
    });
    const responseText: string = await response.text();
    const { rates, error }: any = JSON.parse(responseText);

    if (error) {
      throw new Error(error);
    }

    if (!rates || !Object.keys(rates).length) {
      throw new Error("Could not fetch rates.");
    }

    return rates;
  } catch (errorResponse) {
    throw errorResponse;
  }
};
