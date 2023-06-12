import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";

export default function MainQuiz() {
  // quizQuestion, hard coded array for now API call later
  const quizQuestions = [
    {
      question: "59 + 95",
      answer: 154,
      wrong_answers: [54, 102, 112],
    },
    {
      question: "313 x 5",
      level: "HARD",
      answer: 1565,
      wrong_answers: [1315, 1535, 1554],
    },
    {
      question: "376 - 1",
      answer: 375,
      wrong_answers: [275, 323, 333],
    },
    {
      question: "304 x 79",
      answer: 24016,
      wrong_answers: [23766, 23986, 24005],
    },
    {
      question: "116 - 79",
      answer: 37,
      wrong_answers: [36, 32, -13],
    },
  ];

  // picking a random question/answer object from the array
  function randomQuestion(questionArray) {
    return questionArray[Math.floor(Math.random() * questionArray.length)];
  }

  //handing the array to the established function into a variable to be passed down as props to the necessary parts
  var questionObject = randomQuestion(quizQuestions);

  return (
    <div>
      <QuestionDisplay questionObject={questionObject} />
    </div>
  );
}
