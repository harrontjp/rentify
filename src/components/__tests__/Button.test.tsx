import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Payment";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("should render the button with correct text", () => {
    // Mock data for the paymentForm prop
    const paymentForm = {
      name: "",
      expiry: "",
      cardNo: "",
      ccv: 0,
      bookingId: "",
    };

    // Render the Button component
    render(<Button onSubmit={jest.fn()} paymentForm={paymentForm} />);

    // Check if the button is rendered with the correct text
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should call onSubmit with the correct paymentForm when clicked", () => {
    // Create a mock function for onSubmit
    const onSubmitMock = jest.fn();

    // Mock data for the paymentForm prop
    const paymentForm = {
      name: "",
      expiry: "",
      cardNo: "",
      ccv: 0,
      bookingId: "",
    };

    // Render the Button component
    render(<Button onSubmit={onSubmitMock} paymentForm={paymentForm} />);

    // Find the button and simulate a click
    const button = screen.getByText("Submit");
    fireEvent.click(button);

    // Check if onSubmit has been called with the correct paymentForm
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(paymentForm);
  });
});
