import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders quiz component when URL matches "/quiz"', () => {
  render(
    <MemoryRouter initialEntries={['/quiz']}>
      <App />
    </MemoryRouter>
  );

  const quizTitle = screen.getByText(/Quiz Component/i);
  expect(quizTitle).toBeInTheDocument();
});


test('renders login page when there is no session', () => {
  render(<App />);
  const loginTitle = screen.getByText(/The revision app that actually works/i);
  expect(loginTitle).toBeInTheDocument();
});


test('renders dashboard when there is an active session', () => {
  // Create a mock session object
  const mockSession = {
    user: {
      id: 1,
      email: 'test@example.com',
    },
  };

  // Render the App component with the mock session
  render(<App />, { session: mockSession });

  // Assert that the dashboard component is rendered
  const dashboardTitle = screen.getByText(/Welcome to the Dashboard/i);
  expect(dashboardTitle).toBeInTheDocument();
});

test('updates total score when updateScore function is called', async () => {
  render(<App />);
  
  // Simulate a session by logging in
  const loginButton = screen.getByText(/Log In/i);
  userEvent.click(loginButton);
  
  // Update the total score
  const updateScoreButton = screen.getByText(/Update Score/i);
  userEvent.click(updateScoreButton);
  
  // Wait for the score update to complete
  await waitFor(() => {
    const updatedScoreMessage = screen.getByText(/Total Score Updated/i);
    expect(updatedScoreMessage).toBeInTheDocument();
  });
});




