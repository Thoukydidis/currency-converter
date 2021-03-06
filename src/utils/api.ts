import { FailedReturn } from "./interfaces";

const BASE_URL = process.env.REACT_APP_EXCHANGE_RATES_BASE_URL ?? "";
const API_KEY = process.env.REACT_APP_EXCHANGE_RATES_API_KEY ?? "";

export type API<T> = (params: {
  endpoint: string;
  params: T;
}) => Promise<Response | FailedReturn>;

type FetchRates = {
  base?: string;
};

const api: API<FetchRates> = ({ endpoint, params = {} }) => {
  const searchParams = new URLSearchParams(params);
  searchParams.append("access_key", API_KEY);
  const queryString = searchParams.toString();

  return fetch(`${BASE_URL}${endpoint}?${queryString}`);
};

export const fetchRates = async (baseCurrency: string) => {
  try {
    const response = await api({
      endpoint: "/latest",
      params: { base: baseCurrency },
    });
    const responseText: string = await response.text();
    const { rates, error }: any = JSON.parse(responseText);

    if (error) {
      return error;
      // throw new Error(error);
    }

    if (!rates || !Object.keys(rates).length) {
      throw new Error("Could not fetch rates.");
    }

    return rates;
  } catch (errorResponse) {
    throw errorResponse;
  }
};
