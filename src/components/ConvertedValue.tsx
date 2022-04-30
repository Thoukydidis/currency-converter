import React from "react";
import CurrencyList from "currency-list";
import "./ConvertedValue.css";

interface Props {
  currencyFrom: string;
  currencyTo: string;
  convertedValue: string;
  children: JSX.Element;
  isHistory?: boolean;
}

const ConvertedValue = (props: Props) => {
  const { currencyFrom, currencyTo, convertedValue, children, isHistory } =
    props;
  const currencyFromFull = CurrencyList.get(currencyFrom?.toUpperCase())?.name;
  const currencyToFull = CurrencyList.get(currencyTo?.toUpperCase())?.name;

  const equals: string = "equals";
  const amount: string = "1.00";

  if (currencyFrom && currencyTo && convertedValue) {
    return (
      <div className={isHistory ? "historyBox" : "convertedBox"}>
        <div className="convertedInfoContainer">
          <span>
            {amount} {currencyFromFull ? currencyFromFull : currencyFrom}{" "}
            {equals}
          </span>
          <span className="convertedValue">
            {convertedValue} {currencyToFull ? currencyToFull : currencyTo}
          </span>
        </div>
        {children}
      </div>
    );
  } else return null;
};

export default ConvertedValue;
