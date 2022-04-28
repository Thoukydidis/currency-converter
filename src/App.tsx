import React from "react";

import "./App.css";

import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
