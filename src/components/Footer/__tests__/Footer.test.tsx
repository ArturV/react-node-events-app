import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import renderer from "react-test-renderer";

describe("Footer", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Footer />);

    // expect(tree).toMatchSnapshot();
  });

  it("should render copyright", () => {
    render(<Footer />);

    const copyright = screen.getByLabelText("copyright");

    expect(copyright).toBeVisible();
    expect(copyright).toBeInTheDocument();
  });
});
