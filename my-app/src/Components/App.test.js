import { render, screen } from '@testing-library/react';
import App from '../../App.js';

// test('runs trivial test', () => {
//   render(<App />);
//   const linkElement = screen.getByText('Learn React');
//   expect(linkElement).toBeInTheDocument();
// });

test('welcome back exists on page', () => {
  render(<App />);
  const linkElement = screen.getByText('Welcome Back');
  expect(linkElement).toBeInTheDocument();
});