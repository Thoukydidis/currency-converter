import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./CurrencyConverter.css";
import { fetchRates } from "../utils/api";
import { currenciesCode } from "../utils/currencies";

const CurrencyConverter = () => {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const rates = await fetchRates("EUR");
      console.log(rates);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const isValidCurrency = (value: string): boolean => {
    console.log("isValidCurrency:", currenciesCode[value.toUpperCase()]);
    return !!currenciesCode[value.toUpperCase()];
  };

  const handleOnChange = (value: string) => {
    const separatedValues: Array<string> = value.split(" ");
    const isValid: boolean =
      !!Number(separatedValues[0]) &&
      isValidCurrency(separatedValues[1]) &&
      separatedValues[2] === "to" &&
      isValidCurrency(separatedValues[3]) &&
      separatedValues.length === 4;

    if (isValid) {
      setIsValid(true);
      setErrorMessage("");
    } else if (separatedValues[1] && !isValidCurrency(separatedValues[1])) {
      setIsValid(false);
      setErrorMessage(`Base '${separatedValues[1]}' is not supported.`);
    } else if (separatedValues[3] && !isValidCurrency(separatedValues[3])) {
      setIsValid(false);
      setErrorMessage(`Base '${separatedValues[3]}' is not supported.`);
    } else {
      setIsValid(false);
      setErrorMessage(
        "Invalid input structure. Clear the input to see the structure."
      );
    }
  };

  return (
    <>
      <TextField
        error={!isValid}
        style={{ display: "flex" }}
        id="filled-error-helper-text"
        label="Converter"
        placeholder="e.g. 1 AUD to USD"
        size="small"
        onChange={(e) => handleOnChange(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit} disabled={!isValid}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <div className="errorMessage">{errorMessage}</div>
    </>
  );
};

export default CurrencyConverter;
