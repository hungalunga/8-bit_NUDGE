import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
export default function MainQuiz() {

  // quizQuestion, hard coded array for now, API call later
  const quizQuestions = [
    {
      id: 1,
      question: "59 + 95",
      answer: 154,
      wrong_answers: [54, 102, 112],
    },
    {
      id: 2,
      question: "313 x 5",
      level: "HARD",
      answer: 1565,
      wrong_answers: [1315, 1535, 1554],
    },
    {
      id: 3,
      question: "376 - 1",
      answer: 375,
      wrong_answers: [275, 323, 333],
    },
    {
      id: 4,
      question: "304 x 79",
      answer: 24016,
      wrong_answers: [23766, 23986, 24005],
    },
    {
      id: 5,
      question: "116 - 79",
      answer: 37,
      wrong_answers: [36, 32, -13],
    },
  ];

  // choose ten random questions from the main question dataset
  // store them in an array

const [questionObject, setQuestionObject] = useState({});
const [resultsValue, setResultsValue] = useState(0);

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
      <QuestionDisplay questionObject={questionObject} questionNumber= {questionNumber} setQuestionNumber = {setQuestionNumber} incorrectAnswers = {incorrectAnswers} setIncorrectAnswers = {setIncorrectAnswers} resultsValue = {resultsValue} setResultsValue ={setResultsValue} />
    </div>
  );
}


