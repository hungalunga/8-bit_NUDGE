import { render, screen } from '@testing-library/react';
import PromptQuiz from './PromptQuiz';

const mockFetch = jest.fn();
global.fetch = mockFetch;

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

describe('PromptQuiz', () => {
    test('displays countdown number when countdownNumber > 0 and not late', () => {
        render(
            <PromptQuiz
                late={false}
                countdownNumber={5}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
            />
        );
        const countdownElement = screen.getByText('Get ready to answer in...');
        expect(countdownElement).toBeInTheDocument();
    });

    test('displays "Sorry, you missed your daily nudge" message when late is true', () => {
        render(
            <PromptQuiz
                late={true}
                countdownNumber={0}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
            />
        );
        const messageElement = screen.getByText(
            'Sorry, you missed your daily nudge!'
        );
        expect(messageElement).toBeInTheDocument();
    });

    test('calls getQuestions function on component mount', () => {
        render(
            <PromptQuiz
                late={false}
                countdownNumber={0}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
            />
        );
        expect(mockFetch).toHaveBeenCalled();
    });

    test('sets questionObject state when questionNumber is 1', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => ({
                question: 'Sample question',
                answers: ['Answer 1', 'Answer 2', 'Answer 3'],
                correctAnswer: 1,
            }),
        });
        render(
            <PromptQuiz
                late={false}
                countdownNumber={0}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
            />
        );
        const questionElement = await screen.findByText('Sample question');
        expect(questionElement).toBeInTheDocument();
    });

    test('calls setQuestionObject with undefined when questionNumber is not 1', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => ({
                question: 'Sample question',
                answers: ['Answer 1', 'Answer 2', 'Answer 3'],
                correctAnswer: 1,
            }),
        });
        const { rerender } = render(
            <PromptQuiz
                late={false}
                countdownNumber={0}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
                questionNumber={2}
            />
        );
        rerender(
            <PromptQuiz
                late={false}
                countdownNumber={0}
                supabase={mockSupabase}
                session={mockSession}
                streak={false}
                setStreak={() => { }}
                totalScore={100}
                setTotalScore={() => { }}
                streakCount={0}
                setStreakCount={() => { }}
                questionNumber={1}
            />
        );
        const questionElement = await screen.findByText('Sample question');
        expect(questionElement).toBeInTheDocument();
    });
});
  
