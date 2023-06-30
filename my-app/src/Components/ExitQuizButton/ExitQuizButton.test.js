import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ExitQuizButton from "./ExitQuizButton";

describe("ExitQuizButton", () => {
  beforeEach(() => {
    window.confirm = jest.fn(); // Mock the window.confirm function
    window.location.href = "/"; // Reset the window location href
  });

  test("displays the button and triggers exitAlert function", () => {
    render(<ExitQuizButton />);

    // Assert that the button is rendered
    const buttonElement = screen.getByText("X Leave Quiz");
    expect(buttonElement).toBeInTheDocument();

    // Mock the window.confirm function to return true
    window.confirm.mockReturnValueOnce(true);

    // Trigger the click event on the button
    fireEvent.click(buttonElement);

    // Assert that the exitAlert function is called
    expect(window.confirm).toHaveBeenCalledTimes(1);

    // Assert that the window.location.href is set to "/"
    expect(window.location.href).toBe("/");

    // Mock the window.confirm function to return false
    window.confirm.mockReturnValueOnce(false);

    // Trigger the click event on the button again
    fireEvent.click(buttonElement);

    // Assert that the exitAlert function is called
    expect(window.confirm).toHaveBeenCalledTimes(2);

    // Assert that the window.location.href remains unchanged
    expect(window.location.href).toBe("/");
  });
});
