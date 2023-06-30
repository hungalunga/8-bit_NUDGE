import { render, screen, fireEvent } from '@testing-library/react';
import PromptQuizCorrect from './PromptQuizCorrect';

const mockSupabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        data: [{ user_score: 100 }],
      }),
    }),
    update: () => ({
      eq: () => {},
    }),
  }),
};

const mockSession = {
  user: { id: 123 },
};

describe('PromptQuizCorrect', () => {
  test('displays "Not quite!" and the correct answer when withinTime is false', () => {
    render(
      <PromptQuizCorrect
        withinTime={false}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={0}
        correctAnswer="Paris"
        question="What is the capital of France?"
      />
    );
    const notQuiteElement = screen.getByText('Not quite!');
    const correctAnswerElement = screen.getByText('The correct answer is');
    const answerElement = screen.getByText('Paris');
    expect(notQuiteElement).toBeInTheDocument();
    expect(correctAnswerElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
  });

  test('calls addScore function when "Try another quiz" button is clicked', () => {
    const setTotalScoreMock = jest.fn();
    render(
      <PromptQuizCorrect
        withinTime={false}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={setTotalScoreMock}
        totalScore={0}
        correctAnswer="Paris"
        question="What is the capital of France?"
      />
    );
    const tryAnotherQuizButton = screen.getByText('Try another quiz');
    fireEvent.click(tryAnotherQuizButton);
    expect(setTotalScoreMock).toHaveBeenCalledTimes(1);
  });

  test('displays "Not quite!" and the correct answer when withinTime is true', () => {
    render(
      <PromptQuizCorrect
        withinTime={true}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={0}
        correctAnswer="Paris"
        question="What is the capital of France?"
      />
    );
    const notQuiteElement = screen.getByText('Not quite!');
    const correctAnswerElement = screen.getByText('The correct answer is');
    const answerElement = screen.getByText('Paris');
    expect(notQuiteElement).toBeInTheDocument();
    expect(correctAnswerElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
  });
});
