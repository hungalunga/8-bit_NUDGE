import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainQuizComplete from './MainQuizComplete';

test('displays completion message and XP card', () => {
  const props = {
    quizScore: 30,
    setTotalScore: jest.fn(),
    supabase: {},
    session: {},
    streak: false,
    setStreakCount: jest.fn(),
    setStreak: jest.fn(),
  };
  render(
    <Router>
      <MainQuizComplete {...props} />
    </Router>
  );
  
  const completionMessage = screen.getByText('You did it!');
  const xpCard = screen.getByText('+30 XP');
  
  expect(completionMessage).toBeInTheDocument();
  expect(xpCard).toBeInTheDocument();
});

test('displays correct singular message when quiz score is 10', () => {
  const props = {
    quizScore: 10,
    setTotalScore: jest.fn(),
    supabase: {},
    session: {},
    streak: false,
    setStreakCount: jest.fn(),
    setStreak: jest.fn(),
  };
  render(
    <Router>
      <MainQuizComplete {...props} />
    </Router>
  );
  
  const singularMessage = screen.getByText('You answered 1 question correctly first time.');
  
  expect(singularMessage).toBeInTheDocument();
});

test('displays correct plural message when quiz score is greater than 10', () => {
  const props = {
    quizScore: 20,
    setTotalScore: jest.fn(),
    supabase: {},
    session: {},
    streak: false,
    setStreakCount: jest.fn(),
    setStreak: jest.fn(),
  };
  render(
    <Router>
      <MainQuizComplete {...props} />
    </Router>
  );
  
  const pluralMessage = screen.getByText('You answered 2 questions correctly first time.');
  
  expect(pluralMessage).toBeInTheDocument();
});

test('calls resetClick function when "Keep Quizzing" button is clicked', () => {
  const resetClick = jest.fn();
  const props = {
    quizScore: 30,
    setTotalScore: jest.fn(),
    supabase: {},
    session: {},
    streak: false,
    setStreakCount: jest.fn(),
    setStreak: jest.fn(),
  };
  render(
    <Router>
      <MainQuizComplete {...props} resetClick={resetClick} />
    </Router>
  );
  
  const keepQuizzingButton = screen.getByLabelText('Keep Quizzing');
  fireEvent.click(keepQuizzingButton);
  
  expect(resetClick).toHaveBeenCalledTimes(1);
});

test('updates total score when resetClick function is called', () => {
  const setTotalScore = jest.fn();
  const props = {
    quizScore: 30,
    setTotalScore: setTotalScore,
    supabase: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    },
    session: {
      user: {
        id: 1,
      },
    },
    streak: false,
    setStreakCount: jest.fn(),
    setStreak: jest.fn(),
  };
  render(
    <Router>
      <MainQuizComplete {...props} />
    </Router>
  );
  
  props.supabase.from().select().eq().mockResolvedValue({ data: [{ user_score: 50 }] });
  
  fireEvent.click(screen.getByLabelText('Keep Quizzing'));
  
  expect(setTotalScore).toHaveBeenCalledTimes(1);
  expect(setTotalScore).toHaveBeenCalledWith(80);
});
