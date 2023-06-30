import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AnswerCheckbox from "./AnswerCheckbox";

describe("AnswerCheckbox", () => {
  const mockSetResultsValue = jest.fn();
  const mockSetIncorrectAnswers = jest.fn();
  const mockSetWithinTime = jest.fn();

  test("displays answer options and selects one", () => {
    const correctAnswer = "Correct Answer";
    const wrongAnswers = ["Wrong Answer 1", "Wrong Answer 2"];

    render(
      <AnswerCheckbox
        setResultsValue={mockSetResultsValue}
        correctAnswer={correctAnswer}
        wrongAnswers={wrongAnswers}
      />
    );

    expect(screen.getByText(correctAnswer)).toBeInTheDocument();
    wrongAnswers.forEach((answer) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });

    const firstAnswerOption = screen.getByLabelText(correctAnswer);
    fireEvent.click(firstAnswerOption);

    expect(firstAnswerOption.checked).toBe(true);
  });

  test("calls setResultsValue with the correct value when submitting the answer", () => {
    const correctAnswer = "Correct Answer";
    const wrongAnswers = ["Wrong Answer 1", "Wrong Answer 2"];
    const selectedAnswer = "Correct Answer";

     render(
      <AnswerCheckbox
        setResultsValue={mockSetResultsValue}
        correctAnswer={correctAnswer}
        wrongAnswers={wrongAnswers}
      />
    );

    const answerOption = screen.getByLabelText(selectedAnswer);
    fireEvent.click(answerOption);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockSetResultsValue).toHaveBeenCalledWith(1);
  });

  test("calls setResultsValue with 0 when submitting without selecting an answer", () => {
    const correctAnswer = "Correct Answer";
    const wrongAnswers = ["Wrong Answer 1", "Wrong Answer 2"];

     render(
      <AnswerCheckbox
        setResultsValue={mockSetResultsValue}
        correctAnswer={correctAnswer}
        wrongAnswers={wrongAnswers}
      />
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockSetResultsValue).toHaveBeenCalledWith(0);
  });

  test("calls setResultsValue with -1 and adds question to incorrectAnswers when submitting a wrong answer", () => {
    const correctAnswer = "Correct Answer";
    const wrongAnswers = ["Wrong Answer 1", "Wrong Answer 2"];
    const selectedAnswer = "Wrong Answer 1";

    render(
      <AnswerCheckbox
        setResultsValue={mockSetResultsValue}
        correctAnswer={correctAnswer}
        wrongAnswers={wrongAnswers}
        incorrectAnswers={[]}
        setIncorrectAnswers={mockSetIncorrectAnswers}
      />
    );

    const answerOption = screen.getByLabelText(selectedAnswer);
    fireEvent.click(answerOption);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockSetResultsValue).toHaveBeenCalledWith(-1);
    expect(mockSetIncorrectAnswers).toHaveBeenCalledWith([
      {
        correctAnswer,
        wrongAnswers,
      },
    ]);
  });

  test("calls setWithinTime with false when seconds is less than or equal to 0", () => {
    const correctAnswer = "Correct Answer";
    const wrongAnswers = ["Wrong Answer 1", "Wrong Answer 2"];
    const seconds = 0;

     render(
      <AnswerCheckbox
        setResultsValue={mockSetResultsValue}
        correctAnswer={correctAnswer}
        wrongAnswers={wrongAnswers}
        seconds={seconds}
        setWithinTime={mockSetWithinTime}
      />
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockSetWithinTime).toHaveBeenCalledWith(false);
  });
});
