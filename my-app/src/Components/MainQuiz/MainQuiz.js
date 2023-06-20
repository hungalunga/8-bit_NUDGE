import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";

export default function MainQuiz() {

  // choose ten random questions from the main question dataset
  // store them in an array

const [questionObject, setQuestionObject] = useState({});
const [resultsValue, setResultsValue] = useState(0); //takes values of 0, 1, -1 corresponding to no answer, correct answer, incorrect answer

  // creating initial states as empty arrays
  // questions that have already been asked 
const [questionSet, setQuestionSet] = useState(quizQuestions)
const [questionNumber, setQuestionNumber] = useState(1); // pass these down to all children as props
const [incorrectAnswers, setIncorrectAnswers] = useState([]);

 
  function getRandomQuestion() {
    //select random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    const randomQuestion = questionSet[randomIndex];
    
    const remainingQuestions = questionSet.filter((question) => question.id !== randomQuestion.id);
    console.log("remaining questions are ", remainingQuestions);

    setQuestionSet(remainingQuestions);
    
    if (questionNumber > 10 || questionSet.length === 0) {
      if(incorrectAnswers.length > 0){
        return incorrectAnswers.shift();
      }
    }
      return randomQuestion;
    }

useEffect(() => {
    const qObject = getRandomQuestion()
      setQuestionObject(qObject);
  }, [questionNumber]); // when questionNumber changes, rerender

  return (
    <div data-testid='question-display' className="mainQuiz">
      <h1>Question {questionNumber}</h1>
      <QuestionDisplay questionObject={questionObject} questionNumber= {questionNumber} setQuestionNumber = {setQuestionNumber} incorrectAnswers = {incorrectAnswers} setIncorrectAnswers = {setIncorrectAnswers} resultsValue = {resultsValue} setResultsValue ={setResultsValue} />
    </div>
  );
}


