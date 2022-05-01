import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CurrencyInputConverter from "./components/CurrencyInputConverter";
import ConvertedValue from "./components/ConvertedValue";
import HistoryOfConverted from "./components/HistoryOfConverted";
import { Rates, HistoryLabel } from "./utils/interfaces";
import { IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { v4 as uuidv4 } from "uuid";

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
      setHistory([
        {
          id: uuidv4(),
          amount: "1",
          currencyFrom: currencyFrom,
          equals: "equals",
          convertedAmount: converted?.toString(),
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

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <CurrencyInputConverter
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
