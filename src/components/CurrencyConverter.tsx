import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./CurrencyConverter.css";
import { fetchRates } from "../utils/api";
import { currenciesCode } from "../utils/currencies";
import { Rates, FailedReturn } from "../utils/interfaces";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import _ from "lodash";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  currencyFrom: string;
  rates?: Rates;
  setRates: React.Dispatch<React.SetStateAction<Rates | undefined>>;
  setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  currencyTo: string;
}

const CurrencyConverter = (props: Props) => {
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
  const structureErrorMessage: string =
    "Invalid input structure. Clear the input to see the structure.";

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

  const isValidCurrency = (value: string): boolean => {
    return !!currenciesCode[value?.toUpperCase()];
  };

  const handleOnChange = (value: string) => {
    setInputValue(value);
    const separatedValues: Array<string> = value.split(" ");

    const isValid: boolean =
      separatedValues[0] === "1" &&
      // TODO uncomment and delete above line in case of directly use of the converted endpoint
      // !!Number(separatedValues[0]) &&
      isValidCurrency(separatedValues[1]) &&
      separatedValues[2]?.toUpperCase() === "TO" &&
      isValidCurrency(separatedValues[3]) &&
      separatedValues[3] !== separatedValues[1] &&
      separatedValues.length === 4;

    if (isValid) {
      setIsValid(true);
      setValidationMessage("");
      // setAmount(separatedValues[0]);
    } else if (separatedValues[1] && !isValidCurrency(separatedValues[1])) {
      setIsValid(false);
      setValidationMessage(`Base '${separatedValues[1]}' is not supported.`);
    } else if (separatedValues[3] && !isValidCurrency(separatedValues[3])) {
      setIsValid(false);
      setValidationMessage(`Base '${separatedValues[3]}' is not supported.`);
    } else {
      setIsValid(false);
      setValidationMessage(structureErrorMessage);
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
        value={inputValue}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit} disabled={!isValid}>
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

export default CurrencyConverter;
