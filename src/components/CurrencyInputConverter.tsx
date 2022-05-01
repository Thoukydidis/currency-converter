import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./CurrencyInputConverter.css";
import { fetchRates } from "../utils/api";
import { Rates, FailedReturn, ValidationReturns } from "../utils/interfaces";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import _ from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import { checkValidations } from "../utils/inputValidations";

export interface Props {
  currencyFrom: string;
  rates?: Rates;
  setRates: React.Dispatch<React.SetStateAction<Rates | undefined>>;
  setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  currencyTo: string;
}

const CurrencyInputConverter = (props: Props) => {
  const {
    setRates,
    currencyFrom,
    setCurrencyFrom,
    setCurrencyTo,
    rates,
    currencyTo,
  } = props;
  const [isValid, setIsValid] = useState<boolean>(false);
  // TODO uncomment in case of directly use of the converted endpoint
  // const [amount, setAmount] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<FailedReturn | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const successMessage: string =
    "You have successfully received the updated rates.";

  useEffect(() => {
    if (!!errorMessage || !_.isEmpty(rates)) {
      setOpen(true);
    }
  }, [errorMessage, rates]);

  useEffect(() => {
    if (!!open) {
      setAutoClose();
    }
  }, [open]);

  useEffect(() => {
    if (currencyFrom && currencyTo) {
      const separatedValues: Array<string> = inputValue.split(" ");
      separatedValues.splice(1, 1, currencyFrom);
      separatedValues.splice(3, 1, currencyTo);
      setInputValue(separatedValues.join(" "));
    }
  }, [currencyTo, currencyFrom]);

  const setAutoClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  function isError(obj: any): obj is FailedReturn {
    return "code" in obj && "message" in obj;
  }
  const handleSubmit = async () => {
    try {
      const separatedValues: Array<string> = inputValue.split(" ");
      const response: Rates | FailedReturn = await fetchRates(
        separatedValues[1]?.toUpperCase()
      );
      if (isError(response)) {
        setErrorMessage(response);
        setRates(undefined);
      } else {
        setCurrencyFrom(separatedValues[1]);
        setCurrencyTo(separatedValues[3]);
        setRates(response);
        setErrorMessage(undefined);
      }
    } catch (e: any) {
      console.error(JSON.stringify(e));
    }
  };
  // TODO uncomment in case of directly use of the converted endpoint
  // const handleSubmit = async () => {
  //   try {
  //     const rates = await fetchConvertedRates(
  //       currencyFrom
  //       currencyTo,
  //       amount.toString()
  //     );
  //   } catch (e: any) {
  //     console.error(e.message);
  //   }
  // };

  const handleOnChange = (value: string) => {
    setInputValue(value);
    const separatedValues: Array<string> = value.split(" ");
    const validationResults: ValidationReturns =
      checkValidations(separatedValues);

    setIsValid(validationResults.isValid);
    setValidationMessage(validationResults.errorMessage);
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
        value={inputValue}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleSubmit}
              disabled={!isValid}
              data-testid="convertButton"
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <div className="validationMessage">{validationMessage}</div>
      <Collapse
        in={open}
        style={{ position: "absolute", top: "10px", width: "355px" }}
      >
        <Alert
          action={
            <IconButton
              data-testid="alertButtonId"
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={!!errorMessage ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {errorMessage?.message ?? successMessage}
        </Alert>
      </Collapse>
    </>
  );
};

export default CurrencyInputConverter;
