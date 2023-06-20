import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import { useState, useEffect } from "react";


export default function MainQuiz() {
  // quizQuestion, hard coded array for now, API call later
  // const quizQuestions = [
  //   {
  //     id: 1,
  //     question: "59 + 95",
  //     answer: 154,
  //     wrong_answers: [54, 102, 112],
  //   },
  //   {
  //     id: 2,
  //     question: "313 x 5",
  //     level: "HARD",
  //     answer: 1565,
  //     wrong_answers: [1315, 1535, 1554],
  //   },
  //   {
  //     id: 3,
  //     question: "376 - 1",
  //     answer: 375,
  //     wrong_answers: [275, 323, 333],
  //   },
  //   {
  //     id: 4,
  //     question: "304 x 79",
  //     answer: 24016,
  //     wrong_answers: [23766, 23986, 24005],
  //   },
  //   {
  //     id: 5,
  //     question: "116 - 79",
  //     answer: 37,
  //     wrong_answers: [36, 32, -13],
  //   },
  // ];
  const [questionObject, setQuestionObject] = useState({});
  const [questionSet, setQuestionSet] = useState([]);

useEffect (() => {
async function getQuizQuestions () {
  try {
    const response = await fetch("http://localhost:3001/math_questions");
    const data = await response.json();
    console.log("data is", data)
    setQuestionSet(data); 
    console.log("questionSet is", questionSet)
  } catch (error) {
    console.error("Error fetching questions", error);
  }
}
getQuizQuestions()
  // creating initial states as empty arrays
  // questions that have already been asked
}, [])

  function getRandomQuestion() {
    //select random question
    console.log(`questionSet is ${JSON.stringify(questionSet)}`)
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    const randomQuestion = questionSet[randomIndex];
    const remainingQuestions = questionSet.filter(
      (question) => question.id !== randomQuestion.id
    );

    setQuestionSet(remainingQuestions);

    // console.log(`remaining questions array is now ${JSON.stringify(remainingQuestions)}`);

    // // if there are no more questions left in remaining array...
    if (remainingQuestions.length === 0) {
      console.log("no more questions left");
      return null;
    }

    // returns the random question
    return randomQuestion;
  }

  useEffect(() => {
    const qObject = getRandomQuestion();
    setQuestionObject(qObject);
  }, [questionSet]);

  return (
    <div>
      <QuestionDisplay questionObject={questionObject} />
    </div>
  );
}
