import { render, screen } from '@testing-library/react';
import PromptQuizDisplay from './PromptQuizDisplay';

const mockQuestionObject = {
  question: 'What is the capital of France?',
  wrong_answers: ['London', 'Berlin', 'Madrid'],
  id: 1,
  answer: 'Paris',
};

describe('PromptQuizDisplay', () => {
  test('displays loading message when questionObject is empty', () => {
    render(
      <PromptQuizDisplay
        questionObject={{}}
        resultsValue={0}
        promptQuestionTimer={true}
        questionNumber={1}
        setQuestionNumber={() => {}}
        setResultsValue={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
      />
    );
    const loadingElement = screen.getByText('loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  test('displays the question and answer checkboxes when resultsValue is 0', () => {
    render(
      <PromptQuizDisplay
        questionObject={mockQuestionObject}
        resultsValue={0}
        promptQuestionTimer={true}
        questionNumber={1}
        setQuestionNumber={() => {}}
        setResultsValue={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
      />
    );
    const questionElement = screen.getByText('What is the capital of France?');
    const answerCheckboxElements = screen.getAllByRole('checkbox');
    expect(questionElement).toBeInTheDocument();
    expect(answerCheckboxElements.length).toBe(4);
  });

  test('displays the PromptQuizCorrect component when resultsValue is 1', () => {
    render(
      <PromptQuizDisplay
        questionObject={mockQuestionObject}
        resultsValue={1}
        promptQuestionTimer={true}
        questionNumber={1}
        setQuestionNumber={() => {}}
        setResultsValue={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
      />
    );
    const promptQuizCorrectElement = screen.getByText('Not quite!');
    expect(promptQuizCorrectElement).toBeInTheDocument();
  });

  test('displays the PromptQuizIncorrect component when resultsValue is -1', () => {
    render(
      <PromptQuizDisplay
        questionObject={mockQuestionObject}
        resultsValue={-1}
        promptQuestionTimer={true}
        questionNumber={1}
        setQuestionNumber={() => {}}
        setResultsValue={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
      />
    );
    const promptQuizIncorrectElement = screen.getByText('Not quite!');
    expect(promptQuizIncorrectElement).toBeInTheDocument();
  });

  test('displays the timer and question when questionObject is not empty and resultsValue is 0', () => {
    render(
      <PromptQuizDisplay
        questionObject={mockQuestionObject}
        resultsValue={0}
        promptQuestionTimer={true}
        questionNumber={1}
        setQuestionNumber={() => {}}
        setResultsValue={() => {}}
        incorrectAnswers={[]}
        setIncorrectAnswers={() => {}}
      />
    );
    const timerElement = screen.getByText('00:60');
    const questionElement = screen.getByText('What is the capital of France?');
    expect(timerElement).toBeInTheDocument();
    expect(questionElement).toBeInTheDocument();
  });
});
