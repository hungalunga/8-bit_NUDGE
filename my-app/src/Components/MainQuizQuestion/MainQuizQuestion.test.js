import { render, screen } from '@testing-library/react';
import MainQuizQuestion from './MainQuizQuestion';

test('renders the question text', () => {
  const question = 'What is the capital of France?';
  render(<MainQuizQuestion question={question} />);
  
  const questionText = screen.getByText(question);
  expect(questionText).toBeInTheDocument();
});

test('renders the AnswerCheckbox component', () => {
  render(<MainQuizQuestion />);
  
  const answerCheckbox = screen.getByTestId('answer-checkbox');
  expect(answerCheckbox).toBeInTheDocument();
});

test('renders the PromptQuestionTimer component when promptQuestionTimer prop is true', () => {
  render(<MainQuizQuestion promptQuestionTimer={true} />);
  
  const promptQuestionTimer = screen.getByTestId('prompt-question-timer');
  expect(promptQuestionTimer).toBeInTheDocument();
});

test('does not render the PromptQuestionTimer component when promptQuestionTimer prop is false', () => {
  render(<MainQuizQuestion promptQuestionTimer={false} />);
  
  const promptQuestionTimer = screen.queryByTestId('prompt-question-timer');
  expect(promptQuestionTimer).not.toBeInTheDocument();
});

test('renders the TextToSpeech component', () => {
  const questionObject = {
    question: 'What is the capital of France?',
  };
  render(<MainQuizQuestion questionObject={questionObject} />);
  
  const textToSpeech = screen.getByTestId('text-to-speech');
  expect(textToSpeech).toBeInTheDocument();
});
