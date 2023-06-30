import { render, screen, fireEvent } from '@testing-library/react';
import MainQuizIncorrect from './MainQuizIncorrect';

test('renders the correct answer', () => {
  const questionObject = {
    question: 'What is the capital of France?',
    answer: 'Paris',
  };
  render(<MainQuizIncorrect questionObject={questionObject} />);
  
  const correctAnswer = screen.getByText(questionObject.answer);
  expect(correctAnswer).toBeInTheDocument();
});

test('renders the TextToSpeech component', () => {
  const questionObject = {
    question: 'What is the capital of France?',
    answer: 'Paris',
  };
  render(<MainQuizIncorrect questionObject={questionObject} />);
  
  const textToSpeech = screen.getByTestId('text-to-speech');
  expect(textToSpeech).toBeInTheDocument();
});

test('displays the next button', () => {
  const handleNextClick = jest.fn();
  const nextMessage = 'Next Question';
  render(<MainQuizIncorrect handleNextClick={handleNextClick} nextMessage={nextMessage} />);
  
  const nextButton = screen.getByRole('button', { name: nextMessage });
  expect(nextButton).toBeInTheDocument();
});

test('calls the handleNextClick function when next button is clicked', () => {
  const handleNextClick = jest.fn();
  const nextMessage = 'Next Question';
  render(<MainQuizIncorrect handleNextClick={handleNextClick} nextMessage={nextMessage} />);
  
  const nextButton = screen.getByRole('button', { name: nextMessage });
  fireEvent.click(nextButton);
  
  expect(handleNextClick).toHaveBeenCalledTimes(1);
});

test('displays the "Not quite..." message', () => {
  const questionObject = {
    question: 'What is the capital of France?',
    answer: 'Paris',
  };
  render(<MainQuizIncorrect questionObject={questionObject} />);
  
  const notQuiteMessage = screen.getByText('Not quite...');
  expect(notQuiteMessage).toBeInTheDocument();
});
