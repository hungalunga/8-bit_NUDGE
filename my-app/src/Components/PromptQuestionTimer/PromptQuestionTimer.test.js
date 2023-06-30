import { render, screen, waitFor } from '@testing-library/react';
import PromptQuestionTimer from './PromptQuestionTimer';

test('timer stops when seconds reach 0', async () => {
  render(<PromptQuestionTimer seconds={0} setSeconds={() => {}} />);
  
  // Wait for a sufficient amount of time to ensure the timer has stopped
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 2000)));
  
  // Assert that the timer value remains at 0
  const timerValueElement = screen.getByText('0 : 0');
  expect(timerValueElement).toBeInTheDocument();
});

test('timer counts down correctly', async () => {
  render(<PromptQuestionTimer seconds={120} setSeconds={() => {}} />);
  
  // Wait for 1 second
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 1000)));
  
  // Assert that the timer value is decreased by 1 second
  const timerValueElement = screen.getByText('1 : 59');
  expect(timerValueElement).toBeInTheDocument();
});

test('timer value is correctly formatted with leading zeros', () => {
  render(<PromptQuestionTimer seconds={125} setSeconds={() => {}} />);
  
  // Assert that the timer value is correctly formatted
  const timerValueElement = screen.getByText('2 : 05');
  expect(timerValueElement).toBeInTheDocument();
});

test('timer value is correctly formatted without leading zeros', () => {
  render(<PromptQuestionTimer seconds={345} setSeconds={() => {}} />);
  
  // Assert that the timer value is correctly formatted
  const timerValueElement = screen.getByText('5 : 45');
  expect(timerValueElement).toBeInTheDocument();
});

test('useEffect cleanup function is called when unmounted', () => {
  const mockCleanup = jest.fn();
  const { unmount } = render(<PromptQuestionTimer seconds={60} setSeconds={() => {}} />);
  
  // Call the unmount function to simulate component unmounting
  unmount();
  
  // Assert that the cleanup function is called
  expect(mockCleanup).toHaveBeenCalled();
});
