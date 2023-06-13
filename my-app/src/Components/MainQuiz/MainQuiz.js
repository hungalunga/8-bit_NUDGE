import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";
export default function MainQuiz() {
  // import usestate
  // use state to create an empty array, usedQuestions
  // in random question, test whether the randomly chosen question is in usedQuestions
  // if not, return it
  // if so, recurse on randomQuestion

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

  const usedUpQuestionsTestSet = [
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
  ];

  // choose ten random questions from the main question dataset
  // store them in an array

  // const [usedQuestions, setUsedQuestions] = useState(usedUpQuestionsTestSet);
const [questionObject, setQuestionObject] = useState("");

  // creating initial states as empty arrays
// questions that have already been asked 
const [questionSet, setQuestionSet] = useState(quizQuestions);

//correct answers and incorrect answers.
// const [correctAnswers, setCorrectAnswers] = useState([]);
// const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  function getRandomQuestion() {

    //select random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    const randomQuestion = questionSet[randomIndex];
    console.log("random question is ", randomQuestion);
    
    const remainingQuestions = questionSet.filter((question) => question.id !== randomQuestion.id);

    setQuestionSet(remainingQuestions);

    // remove from remaining questions array
    //setRemainingQuestions (remainingQuestions.slice(0, randomIndex).concat(remainingQuestions.slice(randomIndex + 1)));

    console.log(`remaining questions array is now ${JSON.stringify(remainingQuestions)}`);
    
      // // if there are no more questions left in remaining array...
      if (remainingQuestions.length === 0) {
        console.log("no more questions left");
      //   // if incorrect answers array is more than 0...
      //   if (incorrectAnswers.length > 0) {
      //     // remove and return (re-ask) the first question in the incorrect answers array
      //     return incorrectAnswers.shift();
      //   } else {
      //     // All questions have been asked and there are no incorrect answers
      //     return null;
      //   }
      }
    
      // returns the random question
      return randomQuestion;
    }


  // picking a random question/answer object from the array

  // function randomQuestion(questionArray) {
  //   console.log("usedQuestions equals ", usedQuestions);

  //   // Empties usedQuestions when it nearly equals the complete array of questions
  //   // if (usedQuestions.length > questionArray.length - 2) {
  //   //   setUsedQuestions([]);
  //   // }

  //   //Chooses a random question from questionArray
  //   let randomlyChosenQuestion =
  //     questionArray[Math.floor(Math.random() * questionArray.length)];

  //   // checks whether the random question has been used. If not, adds to usedQuestions and returns it
  //   const isObjectInArray = usedQuestions.some(function (element) {
  //     console.log(`the selected question id is ${randomlyChosenQuestion.id}`);
  //     console.log(` the element id is ${element.id}`);
  //     // Compare based on object properties
  //     return element.id === randomlyChosenQuestion.id;
  //   });

  //   console.log(
  //     `for item ${randomlyChosenQuestion.question} isObjectInArray has value:`,
  //     isObjectInArray
  //   );
  //   if (isObjectInArray) {
  //     console.log("we have called the function again");
  //     randomQuestion(questionArray);

  //   }

  //   // otherwise goes looking for a random question again.
  //   else {
  //     console.log("found unused question");
  //     setUsedQuestions([...usedQuestions, randomlyChosenQuestion]);
  //     console.log(`returned question is ${randomlyChosenQuestion.question}`)
  //     return randomlyChosenQuestion;
  //   }
  // }

  //handing the array to the established function into a variable to be passed down as props to the necessary parts
  useEffect(() => {
    const qObject = getRandomQuestion();
    if (qObject !== undefined) {
      setQuestionObject(qObject);
    }
  }, []);

  return (
    <div>
      <QuestionDisplay questionObject={questionObject} />
    </div>
  );
}
