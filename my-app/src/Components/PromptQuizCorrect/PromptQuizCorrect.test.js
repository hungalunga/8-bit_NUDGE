import { render, screen } from '@testing-library/react';
import PromptQuizCorrect from './PromptQuizCorrect';

const mockSupabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        data: [{ user_score: 100 }],
      }),
    }),
    update: () => {},
  }),
};

const mockSession = {
  user: {
    id: 1,
  },
};

describe('PromptQuizCorrect', () => {
  test('displays "Better late than never" message when withinTime is false', () => {
    render(
      <PromptQuizCorrect
        withinTime={false}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={100}
        streak={false}
        setStreak={() => {}}
        streakCount={0}
        setStreakCount={() => {}}
      />
    );
    const messageElement = screen.getByText('Better late than never...');
    expect(messageElement).toBeInTheDocument();
  });

  test('displays "You smashed it!" message and Confetti when withinTime is true', () => {
    render(
      <PromptQuizCorrect
        withinTime={true}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={100}
        streak={false}
        setStreak={() => {}}
        streakCount={0}
        setStreakCount={() => {}}
      />
    );
    const messageElement = screen.getByText('You smashed it!');
    const confettiElement = screen.getByTestId('confetti');
    expect(messageElement).toBeInTheDocument();
    expect(confettiElement).toBeInTheDocument();
  });

  test('calls updateScore function with the correct score when withinTime is false', () => {
    const updateScoreMock = jest.fn();
    render(
      <PromptQuizCorrect
        withinTime={false}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={100}
        streak={false}
        setStreak={() => {}}
        streakCount={0}
        setStreakCount={() => {}}
      />
    );
    const tryAnotherQuizButton = screen.getByText('Try another quiz');
    tryAnotherQuizButton.click();
    expect(updateScoreMock).toHaveBeenCalledWith(100);
  });

  test('calls updateScore function with the correct score when withinTime is true', () => {
    const updateScoreMock = jest.fn();
    render(
      <PromptQuizCorrect
        withinTime={true}
        supabase={mockSupabase}
        session={mockSession}
        setTotalScore={() => {}}
        totalScore={100}
        streak={false}
        setStreak={() => {}}
        streakCount={0}
        setStreakCount={() => {}}
      />
    );
    const tryAnotherQuizButton = screen.getByText('Try another quiz');
    tryAnotherQuizButton.click();
    expect(updateScoreMock).toHaveBeenCalledWith(200);
  });
});
