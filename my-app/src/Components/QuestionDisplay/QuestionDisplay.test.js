import { render, screen } from '@testing-library/react';
import QuestionDisplay from './QuestionDisplay';

const mockQuestionObject = {
  question: 'What is the capital of France?',
  wrong_answers: ['London', 'Berlin', 'Rome'],
  id: 1,
  answer: 'Paris',
};

describe('QuestionDisplay', () => {
  test('renders the question', () => {
    render(
      <QuestionDisplay
        questionObject={mockQuestionObject}
        resultsValue={0}
        setResultsValue={() => {}}
        questionNumber={1}
        setQuestionNumber={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
        getRandomQuestion={() => {}}
      />
    );
    const questionElement = screen.getByText('What is the capital of France?');
    expect(questionElement).toBeInTheDocument();
  });

  test('displays "loading..." when questionObject is empty', () => {
    render(
      <QuestionDisplay
        questionObject={{}}
        resultsValue={0}
        setResultsValue={() => {}}
        questionNumber={1}
        setQuestionNumber={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
        getRandomQuestion={() => {}}
      />
    );
    const loadingElement = screen.getByText('loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  test('displays "Correct!" when resultsValue is 1', () => {
    render(
      <QuestionDisplay
        questionObject={mockQuestionObject}
        resultsValue={1}
        setResultsValue={() => {}}
        questionNumber={1}
        setQuestionNumber={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
        getRandomQuestion={() => {}}
      />
    );
    const correctElement = screen.getByText('Correct!');
    expect(correctElement).toBeInTheDocument();
  });

  test('displays "Not quite..." and the correct answer when resultsValue is -1', () => {
    render(
      <QuestionDisplay
        questionObject={mockQuestionObject}
        resultsValue={-1}
        setResultsValue={() => {}}
        questionNumber={1}
        setQuestionNumber={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
        getRandomQuestion={() => {}}
      />
    );
    const incorrectElement = screen.getByText('Not quite...');
    const correctAnswerElement = screen.getByText('The correct answer for');
    const answerElement = screen.getByText('Paris');
    expect(incorrectElement).toBeInTheDocument();
    expect(correctAnswerElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
  });

  test('displays "ERROR didnt receive a value of either 1, 0, or -1" when questionObject is not an object', () => {
    render(
      <QuestionDisplay
        questionObject="not an object"
        resultsValue={0}
        setResultsValue={() => {}}
        questionNumber={1}
        setQuestionNumber={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
        getRandomQuestion={() => {}}
      />
    );
    const errorElement = screen.getByText('ERROR didnt recieve a value of either 1, 0 or -1');
    expect(errorElement).toBeInTheDocument();
  });
});
