import React from "react";
import Header from "../Header";
import { cleanup, render } from "@testing-library/react";

describe("render the Header", () => {
  afterEach(cleanup);

  it("should render the Header", () => {
    const view = render(<Header />);
    expect(view).toMatchSnapshot();
  });
});
