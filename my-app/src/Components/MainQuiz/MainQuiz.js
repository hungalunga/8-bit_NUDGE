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
// const [count, setCount] = useState(10);


  // choose ten random questions from the main question dataset
  // store them in an array

  // const [usedQuestions, setUsedQuestions] = useState(usedUpQuestionsTestSet);
const [questionObject, setQuestionObject] = useState({});

  // creating initial states as empty arrays
// questions that have already been asked 
const [questionSet, setQuestionSet] = useState(quizQuestions);

//correct answers and incorrect answers.
// const [correctAnswers, setCorrectAnswers] = useState([]);
// const [incorrectAnswers, setIncorrectAnswers] = useState([]);
const [questionNumber, setQuestionNumber] = useState(1); // pass these down to all children as props
const [incorrectAnswers, setIncorrectAnswers] = useState([]);
 
  function getRandomQuestion() {


    //select random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    const randomQuestion = questionSet[randomIndex];
    // console.log("random question is ", randomQuestion);
    
    const remainingQuestions = questionSet.filter((question) => question.id !== randomQuestion.id);

    console.log("INCORRECT ANSWERS FROM MAINQUIZ:", incorrectAnswers);
    console.log("QUESTION NUMBER MAIN QUIZ:", questionNumber);


    setQuestionSet(remainingQuestions);
      return randomQuestion;
    }

// create a state to update after every question is answered to then render the next question

// function getRandomIncorrect() {

//   //select random question
//   const randomIndex = Math.floor(Math.random() * questionSet.length);
//   const randomQuestion = questionSet[randomIndex];
//   // console.log("random question is ", randomQuestion);
  
//   const remainingQuestions = questionSet.filter((question) => question.id !== randomQuestion.id);

//   console.log("INCORRECT ANSWERS FROM MAINQUIZ:", incorrectAnswers);
//   console.log("QUESTION NUMBER MAIN QUIZ:", questionNumber);

//   setQuestionSet(incorrectAnswers);

//     return randomQuestion;
//   }


useEffect(() => {
    const qObject = getRandomQuestion()
    setQuestionObject(qObject);
    console.log(questionSet)
    // if (questionNumber > 5) {
    //   const qObject = getRandomIncorrect()
    //   setQuestionObject(qObject);
    //}
    if(questionNumber === 5 ){
      setQuestionSet(incorrectAnswers);
      console.log("question set is ", questionSet);
    }
  }, [questionNumber]); // when questionNumber changes, rerender
//    console.log("count is ", count);


  return (
    <div data-testid='question-display'>
      <QuestionDisplay questionObject={questionObject} questionNumber= {questionNumber} setQuestionNumber = {setQuestionNumber} incorrectAnswers = {incorrectAnswers} setIncorrectAnswers = {setIncorrectAnswers}/>
    </div>
  );
}
// }



//handing the array to the established function into a variable to be passed down as props to the necessary parts
  // useEffect(() => {
  //   const qObject = getRandomQuestion();
  //   console.log("HEY HEY HEY HERE qObject is", qObject); 
  //   setQuestionObject(qObject);
    
  // }, []);

  // useEffect( () => {
  //   const qObject = getRandomQuestion();
  //   console.log("HEY HEY HEY HERE qObject is", qObject); 
  //   setQuestionObject(qObject);
  //   console.log("question object is ", questionObject);
// let qObject
  // }, []);


    // console.log(`remaining questions array is now ${JSON.stringify(remainingQuestions)}`);
    
      // // if there are no more questions left in remaining array...
      // if (remainingQuestions.length === 0) {
      //   console.log("no more questions left");
      //   return null;
      // //   // if incorrect answers array is more than 0...
      // //   if (incorrectAnswers.length > 0) {
      // //     // remove and return (re-ask) the first question in the incorrect answers array
      // //     return incorrectAnswers.shift();
      // //   } else {
      // //     // All questions have been asked and there are no incorrect answers
      // //     return null;
      // //   }
      // }



    //  while (count > 0) {
  //     setTimeout(()=> {setCount(count - 1)}, 1000);
  