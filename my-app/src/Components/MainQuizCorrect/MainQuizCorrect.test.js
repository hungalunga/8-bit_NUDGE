import { render, screen } from '@testing-library/react';
import MainQuizCorrect from './MainQuizCorrect';

test('displays correct message and next button', () => {
  const props = {
    nextMessage: 'Next Question',
    setQuizScore: jest.fn(),
    quizScore: 0,
    handleNextClick: jest.fn(),
  };
  render(<MainQuizCorrect {...props} />);
  
  const correctMessage = screen.getByText('🌟You got that right!🌟');
  const nextButton = screen.getByText('Next Question');
  
  expect(correctMessage).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});
