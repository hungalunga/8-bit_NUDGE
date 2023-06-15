import React from 'react';
import { render, screen } from '@testing-library/react';
import MainQuiz from './MainQuiz/MainQuiz';
import QuestionDisplay from './QuestionDisplay/QuestionDisplay';
import jest from '@testing-library/jest-dom'; 

test('renders MyComponent and asserts existence of elements', () => {
    render(<MainQuiz />);
    
    // Using getByTestId matcher
    const componentElement = screen.getByTestId('question-display');
    expect(componentElement).toBeInTheDocument();
  
    // // Using getByText matcher
    // const textElement = screen.getByText('Component Text');
    // expect(textElement).toBeInTheDocument();
  });

// test('returns different outputs on successive runs', () => {
//     render(<MainQuiz />);
//     const question1 = screen.getByTestId('questionObject');
//     const answer1 = screen.getByTestId('questionNumber');
  
//     render(<MainQuiz />);
//     const question2 = screen.getByTestId('questionObject');
//     const answer2 = screen.getByTestId('questionNumber');
  
//     expect(question1.textContent).not.toBe(question2.textContent);
//     expect(answer1.textContent).not.toBe(answer2.textContent);
//   });

// test('instantiates a non-empty object for questionObject', () => {
//     const { container } = render(<MainQuiz />);
//     const questionDisplayComponent = screen.getByRole('QuestionDisplay');
  
//     expect(questionDisplayComponent.props.questionObject).toBeTruthy();
//   });