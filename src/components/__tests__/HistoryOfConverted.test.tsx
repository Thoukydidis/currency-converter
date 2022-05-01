import React from "react";
import HistoryOfConverted, { Props } from "../HistoryOfConverted";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";

describe("render the HistoryOfConverted component", () => {
  afterEach(cleanup);
  const history = [
    {
      id: "a6a43c15-0c8a-480b-b59c-9e1d1a69b4c9",
      amount: "1",
      currencyFrom: "eur",
      equals: "equals",
      convertedAmount: "1.054463",
      currencyTo: "usd",
    },
    {
      id: "4219b163-ba8b-44e1-b596-6d10fa5af8df",
      amount: "1",
      currencyFrom: "eur",
      equals: "equals",
      convertedAmount: "0.000027795424",
      currencyTo: "btc",
    },
    {
      id: "38461ca5-accc-4f90-b5c0-83591e358b32",
      amount: "1",
      currencyFrom: "eur",
      equals: "equals",
      convertedAmount: "1.492116",
      currencyTo: "aud",
    },
    {
      id: "45b2041e-a510-479f-acfe-d3d37aee47f3",
      amount: "1",
      currencyFrom: "eur",
      equals: "equals",
      convertedAmount: "1.054463",
      currencyTo: "usd",
    },
  ];
  const props: Props = {
    history,
    setHistory: () => null,
  };

  it("should render the HistoryOfConverted", () => {
    const view = render(<HistoryOfConverted {...props} />);
    expect(view).toMatchSnapshot();
  });

  it("should trigger the clear all button", () => {
    const { container } = render(<HistoryOfConverted {...props} />);
    const clearAllButton = screen.getByText(/CLEAR ALL/);
    fireEvent.click(clearAllButton);
    expect(container).toMatchSnapshot();
  });

  it("should trigger the remove one Item from history", () => {
    const { container } = render(<HistoryOfConverted {...props} />);
    const removeFromListButton = screen.getByTestId(
      "removeItemFromHistoryButtonId:0"
    );
    fireEvent.click(removeFromListButton);
    expect(container).toMatchSnapshot();
  });

  it("should trigger the onChange of the Pagination Element", () => {
    const { container } = render(<HistoryOfConverted {...props} />);
    const goToPage2Button = screen.getByText(2);
    expect(goToPage2Button).toBeTruthy();
    fireEvent.click(goToPage2Button);
    expect(container).toMatchSnapshot();
  });
});
