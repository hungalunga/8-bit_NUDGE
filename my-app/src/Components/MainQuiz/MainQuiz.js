import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";

export default function MainQuiz() {

  const [questionObject, setQuestionObject] = useState({});
  const [questionSet, setQuestionSet] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [resultsValue, setResultsValue] = useState(0);
  const numberOfQuestions = quizQuestions.length;

  // creating initial states as empty arrays
  // questions that have already been asked

  useEffect (() => {
  async function getQuestions() {
    const response = await fetch("http://localhost:3001/math_questions");
    const data = await response.json();
    console.log(data);
    setQuestionSet(data);
    const qObject = getRandomQuestion()
    setQuestionObject(qObject);
  }

  getQuestions();
  }, []);


  function getRandomQuestion() {
    //select random question
    console.log(`questionSet is ${JSON.stringify(questionSet)}`)
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
 // when questionNumber changes, rerender

// display the question & answers
  return (
    <div data-testid='question-display' className="mainQuiz">
      <QuestionDisplay 
        questionObject={questionObject} 
        questionNumber= {questionNumber} 
        setQuestionNumber = {setQuestionNumber} 
        incorrectAnswers = {incorrectAnswers} 
        setIncorrectAnswers = {setIncorrectAnswers} 
        resultsValue = {resultsValue} 
        setResultsValue ={setResultsValue}

        />
    </div>
  );
}


