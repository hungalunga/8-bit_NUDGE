import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";

export default function MainQuiz() {

  // choose ten random questions from the main question dataset
  // store them in an array

const [questionObject, setQuestionObject] = useState({});

//takes values of 0, 1, -1 corresponding to no answer, correct answer, incorrect answer
  // This value will determine which JSX QuestionDisplay displays (q&a, "Correct!" or "Not Quite" + feedback)
const [resultsValue, setResultsValue] = useState(0); 

// duplicates question database for purposes of manipulation
const [questionSet, setQuestionSet] = useState(quizQuestions)

// carries the number of the question user is up to in the quiz 
const [questionNumber, setQuestionNumber] = useState(1); 

// an array that keeps track of the questions you got wrong
const [incorrectAnswers, setIncorrectAnswers] = useState([]);

// sets the number of questions in the quiz
const [numberOfQuestions, setNumberOfQuestions] = useState(2);
 
  function getRandomQuestion() {
    //select random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    const randomQuestion = questionSet[randomIndex];
    
    // remove the question from the DBcopy and reset using setQuestionSet
    const remainingQuestions = questionSet.filter((question) => question.id !== randomQuestion.id);
    setQuestionSet(remainingQuestions);
    
    // grab from array of wrong answers(after preset number OR when you run out of questions (latter is for robustness))
    if (questionNumber > numberOfQuestions || questionSet.length === 0) {
      if(incorrectAnswers.length > 0){
        return incorrectAnswers.shift(); //return the first wrong answer, removing from array
      }
    }
    else return randomQuestion;
    }

// Whenever questionNumber changes value (i.e. user advances one question in quiz), change the questionObject to new random from DBcopy
useEffect(() => {
    const qObject = getRandomQuestion()
      setQuestionObject(qObject);
  }, [questionNumber]); // when questionNumber changes, rerender

// display the question display
  return (
    <div data-testid='question-display' className="mainQuiz">
      <h1>Question {questionNumber}</h1>
      <QuestionDisplay questionObject={questionObject} questionNumber= {questionNumber} setQuestionNumber = {setQuestionNumber} incorrectAnswers = {incorrectAnswers} setIncorrectAnswers = {setIncorrectAnswers} resultsValue = {resultsValue} setResultsValue ={setResultsValue} />
    </div>
  );
}


