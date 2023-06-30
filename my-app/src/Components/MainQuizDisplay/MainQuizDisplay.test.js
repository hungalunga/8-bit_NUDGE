import { render, screen } from '@testing-library/react';
import MainQuizDisplay from './MainQuizDisplay';

test('displays loading message when questionObject is empty', () => {
  const props = {
    questionObject: {},
    questionNumber: 1,
    setQuestionNumber: jest.fn(),
    getRandomQuestion: jest.fn(),
    resultsValue: 0,
    setResultsValue: jest.fn(),
    quizScore: 0,
    setQuizScore: jest.fn(),
    incorrectAnswers: [],
    setIncorrectAnswers: jest.fn(),
  };
  render(<MainQuizDisplay {...props} />);
  
  const loadingMessage = screen.getByText('loading...');
  expect(loadingMessage).toBeInTheDocument();
});

test('renders MainQuizQuestion component when resultsValue is 0', () => {
  const props = {
    questionObject: {
      question: 'What is the capital of France?',
      answer: 'Paris',
    },
    questionNumber: 1,
    setQuestionNumber: jest.fn(),
    getRandomQuestion: jest.fn(),
    resultsValue: 0,
    setResultsValue: jest.fn(),
    quizScore: 0,
    setQuizScore: jest.fn(),
    incorrectAnswers: [],
    setIncorrectAnswers: jest.fn(),
  };
  render(<MainQuizDisplay {...props} />);
  
  const quizQuestion = screen.getByText(props.questionObject.question);
  expect(quizQuestion).toBeInTheDocument();
});

test('renders MainQuizCorrect component when resultsValue is 1', () => {
  const props = {
    questionObject: {
      question: 'What is the capital of France?',
      answer: 'Paris',
    },
    questionNumber: 1,
    setQuestionNumber: jest.fn(),
    getRandomQuestion: jest.fn(),
    resultsValue: 1,
    setResultsValue: jest.fn(),
    quizScore: 0,
    setQuizScore: jest.fn(),
    incorrectAnswers: [],
    setIncorrectAnswers: jest.fn(),
    nextMessage: 'Next Question',
  };
  render(<MainQuizDisplay {...props} />);
  
  const mainQuizCorrect = screen.getByText('Correct!');
  expect(mainQuizCorrect).toBeInTheDocument();
});

test('renders MainQuizIncorrect component when resultsValue is -1', () => {
  const props = {
    questionObject: {
      question: 'What is the capital of France?',
      answer: 'Paris',
    },
    questionNumber: 1,
    setQuestionNumber: jest.fn(),
    getRandomQuestion: jest.fn(),
    resultsValue: -1,
    setResultsValue: jest.fn(),
    quizScore: 0,
    setQuizScore: jest.fn(),
    incorrectAnswers: [],
    setIncorrectAnswers: jest.fn(),
    nextMessage: 'Next Question',
  };
  render(<MainQuizDisplay {...props} />);
  
  const mainQuizIncorrect = screen.getByText('Not quite...');
  expect(mainQuizIncorrect).toBeInTheDocument();
});

test('displays error message when resultsValue is neither 0, 1, nor -1', () => {
  const props = {
    questionObject: {
      question: 'What is the capital of France?',
      answer: 'Paris',
    },
    questionNumber: 1,
    setQuestionNumber: jest.fn(),
    getRandomQuestion: jest.fn(),
    resultsValue: 2,
    setResultsValue: jest.fn(),
    quizScore: 0,
    setQuizScore: jest.fn(),
    incorrectAnswers: [],
    setIncorrectAnswers: jest.fn(),
  };
  render(<MainQuizDisplay {...props} />);
  
  const errorMessage = screen.getByText('ERROR didnt recieve a value of either 1,0 or -1');
  expect(errorMessage).toBeInTheDocument();
});
