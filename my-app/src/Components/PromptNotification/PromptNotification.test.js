import { render, screen, fireEvent } from '@testing-library/react';
import PromptNotification from './PromptNotification';

test('clicking the button triggers createNotification function', () => {
  const createNotification = jest.fn();
  render(<PromptNotification username="John" />);
  
  // Click the button
  const button = screen.getByRole('button', { name: /Click me to get a NUDGE/i });
  fireEvent.click(button);
  
  // Assert that the createNotification function is called
  expect(createNotification).toHaveBeenCalled();
});

test('createNotification is called with the correct message', () => {
  const createNotification = jest.fn();
  render(<PromptNotification username="John" />);
  
  // Click the button
  const button = screen.getByRole('button', { name: /Click me to get a NUDGE/i });
  fireEvent.click(button);
  
  // Assert that the createNotification function is called with the correct message
  const expectedMessage = 'Time for your daily quiz!!⏰⏰⏰';
  expect(createNotification).toHaveBeenCalledWith(expectedMessage);
});

test('createNotification is called when the current time is between 9 and 17', () => {
  const createNotification = jest.fn();
  jest.useFakeTimers();
  
  // Set the current time to 10:00
  const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2023, 6, 1, 10, 0, 0));
  
  render(<PromptNotification username="John" />);
  
  // Fast-forward time to 10 minutes later
  jest.advanceTimersByTime(10 * 60 * 1000);
  
  // Assert that the createNotification function is called
  expect(createNotification).toHaveBeenCalled();
  
  // Restore the original implementation of Date.now()
  dateNowSpy.mockRestore();
});

test('createNotification is not called when the current time is not between 9 and 17', () => {
  const createNotification = jest.fn();
  jest.useFakeTimers();
  
  // Set the current time to 8:00
  const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2023, 6, 1, 8, 0, 0));
  
  render(<PromptNotification username="John" />);
  
  // Fast-forward time to 10 minutes later
  jest.advanceTimersByTime(10 * 60 * 1000);
  
  // Assert that the createNotification function is not called
  expect(createNotification).not.toHaveBeenCalled();
  
  // Restore the original implementation of Date.now()
  dateNowSpy.mockRestore();
});

test('notification is created when permission is granted', () => {
  const originalNotification = window.Notification;
  const mockNotification = jest.fn();
  window.Notification = mockNotification;
  
  // Mock the Notification permission
  jest.spyOn(window, 'Notification', 'get').mockReturnValue({ permission: 'granted' });
  
  render(<PromptNotification username="John" />);
  
  // Click the button
  const button = screen.getByRole('button', { name: /Click me to get a NUDGE/i });
  fireEvent.click(button);
  
  // Assert that the Notification constructor is called
  expect(mockNotification).toHaveBeenCalled();
  
  // Restore the original Notification object
  window.Notification = originalNotification;
});

test('requestPermission is called when permission is not granted', () => {
  const originalNotification = window.Notification;
  const mockNotification = jest.fn();
  window.Notification = mockNotification;
  
  // Mock the Notification permission
  jest.spyOn(window, 'Notification', 'get').mockReturnValue({ permission: 'denied' });
  
  render(<PromptNotification username="John" />);
  
  // Click the button
  const button = screen.getByRole('button', { name: /Click me to get a NUDGE/i });
  fireEvent.click(button);
  
  // Assert that the requestPermission function is called
  expect(mockNotification.requestPermission).toHaveBeenCalled();
  
  // Restore the original Notification object
  window.Notification = originalNotification;
});
