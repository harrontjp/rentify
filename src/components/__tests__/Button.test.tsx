import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders the correct label", () => {
    const button = document.createElement("button");
    button.textContent = "Click me";
    document.body.appendChild(button);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const button = document.createElement("button");
    button.textContent = "Click me too";
    button.addEventListener("click", handleClick);
    document.body.appendChild(button);
    fireEvent.click(screen.getByText("Click me too"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
