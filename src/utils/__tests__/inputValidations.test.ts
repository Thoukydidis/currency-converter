import {
  checkValidations,
  validReturn,
  notSupportedCurrency,
  structureValidationError,
} from "../inputValidations";
import { ValidationReturns } from "../interfaces";

describe("validate input", () => {
  it("should return that the input is valid", () => {
    const i = checkValidations(["1", "EUR", "to", "USD"]);
    expect(i).toEqual(validReturn);
  });

  it("should return that the input is false and that the input from currency is not supported", () => {
    const expectedResult: ValidationReturns =
      notSupportedCurrency("wrongCurrency");

    const i = checkValidations(["1", "wrongCurrency", "to", "USD"]);
    expect(i).toEqual(expectedResult);
  });

  it("should return that the input is false and that the input to currency is not supported", () => {
    const expectedResult: ValidationReturns =
      notSupportedCurrency("wrongCurrency");

    const i = checkValidations(["1", "EUR", "to", "wrongCurrency"]);
    expect(i).toEqual(expectedResult);
  });
  it("should return that the input is false and that the structure of the input request is wrong", () => {
    const i = checkValidations(["1fds", "EUR", "to", "USD"]);
    expect(i).toEqual(structureValidationError);
  });
});
