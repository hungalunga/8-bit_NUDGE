import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";
import PromptQuestionTimer from "../promptQuestionTimer/PromptQuestionTimer"

export default function PromptRandomGrab() {

  // choose ten random questions from the main question dataset
  // store them in an array

const [questionObject, setQuestionObject] = useState({});

//takes values of 0, 1, -1 corresponding to no answer, correct answer, incorrect answer
  // This value will determine which JSX QuestionDisplay displays (q&a, "Correct!" or "Not Quite" + feedback)
const [resultsValue, setResultsValue] = useState(0); 

// carries the number of the question user is up to in the quiz 
const [questionNumber, setQuestionNumber] = useState(1); 

// an array that keeps track of the questions you got wrong
const [incorrectAnswers, setIncorrectAnswers] = useState([]);

// sets the number of questions in the quiz
const [numberOfQuestions, setNumberOfQuestions] = useState(1);

// displays the completion message at the end of the quiz (variable bc regular quiz passes a different message)
const completionMessage = "Congratulations, you answered your daily nudge!";

// displays the message on the button after answering a question (using variable bc main quiz passes a different message)
const nextMessage = "Finish";
 
  function getRandomQuestion() {
    //select random question
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const randomQuestion = quizQuestions[randomIndex];
    
    // grab from array of wrong answers(after preset number OR when you run out of questions (latter is for robustness))
    if (questionNumber <= numberOfQuestions) {
     return randomQuestion;
    }
  }

// Whenever questionNumber changes value (i.e. user advances one question in quiz), change the questionObject to new random from DBcopy
useEffect(() => {
    const qObject = getRandomQuestion()
      setQuestionObject(qObject);
  }, [questionNumber]); // when questionNumber changes, rerender

// display the question & answers
  return (
    <div>
    <div data-testid='question-display' className="mainQuiz">
      {/* <h1>Question {questionNumber}</h1> */}
      <QuestionDisplay 
        questionObject={questionObject} 
        questionNumber= {questionNumber} 
        setQuestionNumber = {setQuestionNumber} 
        incorrectAnswers = {incorrectAnswers} 
        setIncorrectAnswers = {setIncorrectAnswers} 
        resultsValue = {resultsValue} 
        setResultsValue ={setResultsValue}
        completionMessage = {completionMessage}
        nextMessage = {nextMessage}
        />
    </div>
        <PromptQuestionTimer/>
    </div>
  );
}