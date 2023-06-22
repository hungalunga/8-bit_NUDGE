import QuizDisplay from "../MainQuizDisplay/MainQuizDisplay";
import { useState, useEffect } from "react";
import { quizQuestions } from "../../QuizData";

export default function MainQuiz() {

  const [questionObject, setQuestionObject] = useState({});
  const [questionSet, setQuestionSet] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [resultsValue, setResultsValue] = useState(0);
  const numberOfQuestions = quizQuestions.length;
  const completionMessage = "You've completed the quiz!";
  const nextMessage = "➜";

  // creating initial states as empty arrays
  // questions that have already been asked

  useEffect (() => {
    async function getQuestions() {
      const response = await fetch("http://localhost:3001/math_questions");
      const data = await response.json();
      console.log(data);
      getRandomQuestion(data);
    }
  getQuestions();
  }, []);


  function getRandomQuestion(data) {
    //select random question
    const DbQuestion = data[0];
    console.log(DbQuestion);
    setQuestionObject(DbQuestion);
    // remove the question from the DBcopy and reset using setQuestionSet
    const remainingQuestions = data.filter((question) => question.id !== DbQuestion.id);
    setQuestionSet(remainingQuestions);
    console.log("1 incorrect answers:", incorrectAnswers);
    // grab from array of wrong answers(after preset number OR when you run out of questions (latter is for robustness))
    if (questionNumber > numberOfQuestions || questionSet.length === 0) {
      if (incorrectAnswers.length > 0) {
        const wrongAnswer = incorrectAnswers[0];
        console.log("wrongAnswer:", wrongAnswer);
        setQuestionObject(wrongAnswer);
        const tryAgain = incorrectAnswers.filter((question) => question.id !== wrongAnswer.id);
        setQuestionSet(tryAgain);
        setIncorrectAnswers([]);
        return wrongAnswer;
      }
    }
    else return DbQuestion;
    }

// Whenever questionNumber changes value (i.e. user advances one question in quiz), change the questionObject to new random from DBcopy
 // when questionNumber changes, rerender

// display the question & answers
  return (
    <div data-testid='question-display' className="mainQuiz">
      <QuizDisplay 
        questionObject={questionObject} 
        getRandomQuestion={getRandomQuestion}
        questionSet = {questionSet}
        questionNumber= {questionNumber} 
        setQuestionNumber = {setQuestionNumber} 
        incorrectAnswers = {incorrectAnswers} 
        setIncorrectAnswers = {setIncorrectAnswers} 
        resultsValue = {resultsValue} 
        setResultsValue ={setResultsValue}
        completionMessage = {completionMessage}
        nextMessage = {nextMessage}
        promptQuestionTimer = {false}
        />
    </div>
  );
}


