import { currenciesCode } from "./currencies";
import { ValidationReturns } from "./interfaces";

const structureErrorMessage: string =
  "Invalid input structure. Clear the input to see the structure.";

const isValidCurrency = (value: string): boolean => {
  return !!currenciesCode[value?.toUpperCase()];
};

export const validReturn = {
  isValid: true,
  errorMessage: "",
};

export const notSupportedCurrency = (wrongCurrency: string) => {
  return {
    isValid: false,
    errorMessage: `Base '${wrongCurrency}' is not supported.`,
  };
};

export const structureValidationError = {
  isValid: false,
  errorMessage: structureErrorMessage,
};

export const checkValidations = (
  separatedValues: string[]
): ValidationReturns => {
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
    return validReturn;
  } else if (separatedValues[1] && !isValidCurrency(separatedValues[1])) {
    return notSupportedCurrency(separatedValues[1]);
  } else if (separatedValues[3] && !isValidCurrency(separatedValues[3])) {
    return notSupportedCurrency(separatedValues[3]);
  } else {
    return structureValidationError;
  }
};
