import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";
import ConvertedValue from "./components/ConvertedValue";
import HistoryOfConverted from "./components/HistoryOfConverted";
import { Rates, HistoryLabel } from "./utils/interfaces";
import { IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const App = () => {
  const [rates, setRates] = useState<Rates>();
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const [convertedValue, setConvertedValue] = useState<string>("");
  const [history, setHistory] = useState<Array<HistoryLabel> | []>([]);

  useEffect(() => {
    if (!!rates) {
      const converted = rates?.[currencyTo.toUpperCase()];
      converted && setConvertedValue(converted?.toString());
      convertedValue &&
        setHistory([
          {
            amount: "1",
            currencyFrom: currencyFrom,
            equals: "equals",
            convertedAmount: convertedValue,
            currencyTo: currencyTo,
          },
          ...history,
        ]);
    }
  }, [rates]);

  const handleSwap = () => {
    setRates(undefined);
    setConvertedValue("");
    setCurrencyTo(currencyFrom);
    setCurrencyFrom(currencyTo);
  };

  console.log("ratesParent:", rates);
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <CurrencyConverter
          rates={rates}
          currencyFrom={currencyFrom}
          currencyTo={currencyTo}
          setRates={setRates}
          setCurrencyTo={setCurrencyTo}
          setCurrencyFrom={setCurrencyFrom}
        />
        <ConvertedValue
          currencyFrom={currencyFrom}
          currencyTo={currencyTo}
          convertedValue={convertedValue}
        >
          <IconButton onClick={() => handleSwap()}>
            <CompareArrowsIcon className="compareArrowsIcon" />
          </IconButton>
        </ConvertedValue>
        <HistoryOfConverted history={history} setHistory={setHistory} />
      </div>
    </div>
  );
};

export default App;
