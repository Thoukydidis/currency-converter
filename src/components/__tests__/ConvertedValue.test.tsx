import React from "react";
import ConvertedValue, { Props } from "../ConvertedValue";
import { cleanup, render } from "@testing-library/react";

describe("test the CurrencyInputConverter component", () => {
  afterEach(cleanup);
  const props: Props = {
    currencyFrom: "EUR",
    currencyTo: "USD",
    convertedValue: "string",
    children: <div />,
  };
  it("should render the CurrencyInputConverter", () => {
    const view = render(<ConvertedValue {...props} />);
    expect(view).toMatchSnapshot();
  });
  it("should render the histoyBox styles", () => {
    const newProps = { ...props, isHistory: true };
    const view = render(<ConvertedValue {...newProps} />);
    expect(view).toMatchSnapshot();
  });

  it("should not show the full name of the currency from and currency to", () => {
    const newProps = { ...props, currencyFrom: "string", currencyTo: "string" };
    const view = render(<ConvertedValue {...newProps} />);
    expect(view).toMatchSnapshot();
  });
});
