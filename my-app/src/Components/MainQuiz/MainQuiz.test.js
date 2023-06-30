import { render, screen, fireEvent } from '@testing-library/react';
import MainQuiz from './MainQuiz';

test('renders start message when quiz has not started', () => {
  const props = {
    supabase: {},
    session: {},
    quizScore: 0,
    setQuizScore: jest.fn(),
    totalScore: 0,
    setTotalScore: jest.fn(),
    setStreak: jest.fn(),
    streak: false,
    setStreakCount: jest.fn(),
    streakCount: 0,
  };
  render(<MainQuiz {...props} />);
  
  const startMessage = screen.getByText("You've made it this far...");
  const startButton = screen.getByRole('button', { name: "Let's go!" });
  
  expect(startMessage).toBeInTheDocument();
  expect(startButton).toBeInTheDocument();
});

test('calls setQuizStarted function when start button is clicked', () => {
  const setQuizStarted = jest.fn();
  const props = {
    supabase: {},
    session: {},
    quizScore: 0,
    setQuizScore: jest.fn(),
    totalScore: 0,
    setTotalScore: jest.fn(),
    setStreak: jest.fn(),
    streak: false,
    setStreakCount: jest.fn(),
    streakCount: 0,
  };
  render(<MainQuiz {...props} setQuizStarted={setQuizStarted} />);
  
  const startButton = screen.getByRole('button', { name: "Let's go!" });
  fireEvent.click(startButton);
  
  expect(setQuizStarted).toHaveBeenCalledTimes(1);
  expect(setQuizStarted).toHaveBeenCalledWith(true);
});

test('renders MainQuizDisplay component when quiz has started', () => {
  const props = {
    supabase: {},
    session: {},
    quizScore: 0,
    setQuizScore: jest.fn(),
    totalScore: 0,
    setTotalScore: jest.fn(),
    setStreak: jest.fn(),
    streak: false,
    setStreakCount: jest.fn(),
    streakCount: 0,
  };
  render(<MainQuiz {...props} quizStarted={true} />);
  
  const mainQuizDisplay = screen.getByTestId('main-quiz-display');
  
  expect(mainQuizDisplay).toBeInTheDocument();
});

test('calls getRandomQuestion function when quiz has started', () => {
  const getRandomQuestion = jest.fn();
  const props = {
    supabase: {},
    session: {},
    quizScore: 0,
    setQuizScore: jest.fn(),
    totalScore: 0,
    setTotalScore: jest.fn(),
    setStreak: jest.fn(),
    streak: false,
    setStreakCount: jest.fn(),
    streakCount: 0,
  };
  render(<MainQuiz {...props} quizStarted={true} getRandomQuestion={getRandomQuestion} />);
  
  expect(getRandomQuestion).toHaveBeenCalledTimes(1);
});

test('calls setQuizStarted function when exit button is clicked', () => {
  const setQuizStarted = jest.fn();
  const props = {
    supabase: {},
    session: {},
    quizScore: 0,
    setQuizScore: jest.fn(),
    totalScore: 0,
    setTotalScore: jest.fn(),
    setStreak: jest.fn(),
    streak: false,
    setStreakCount: jest.fn(),
    streakCount: 0,
  };
  render(<MainQuiz {...props} setQuizStarted={setQuizStarted} />);
  
  const exitButton = screen.getByRole('button', { name: 'Exit Quiz' });
  fireEvent.click(exitButton);
  
  expect(setQuizStarted).toHaveBeenCalledTimes(1);
  expect(setQuizStarted).toHaveBeenCalledWith(false);
});
