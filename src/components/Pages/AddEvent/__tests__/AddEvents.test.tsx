import { render, fireEvent } from "@testing-library/react";
import React from "react";
import axios from "axios";
import { AddEvent } from "../AddEvent";
import renderer from "react-test-renderer";

jest.mock("axios");

describe("AddEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    const tree = renderer.create(<AddEvent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
