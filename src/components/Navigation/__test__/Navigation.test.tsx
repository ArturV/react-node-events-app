import { render, screen } from "@testing-library/react";
import { Navigation } from "../Navigation";

describe("Navigation", () => {
  it("renders without crashing", () => {
    render(<Navigation />);
  });
});
