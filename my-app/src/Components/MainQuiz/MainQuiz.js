import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import {useState, useEffect} from "react"; 
export default function MainQuiz() {

  // import usestate
  // use state to create an empty array, usedQuestions
  // in random question, test whether the randomly chosen question is in usedQuestions
  // if not, return it
  // if so, recurse on randomQuestion

  // quizQuestion, hard coded array for now, API call later
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

  const usedUpQuestionsTestSet = [
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
  ];

  const [usedQuestions, setUsedQuestions] = useState([usedUpQuestionsTestSet]); 
  const [questionObject, setQuestionObject] = useState('');

  // picking a random question/answer object from the array
 
  function randomQuestion(questionArray) {
    console.log('usedQuestions equals ', usedQuestions)
    // Empties usedQuestions when it nearly equals the complete array of questions
    // if (usedQuestions.length > (questionArray.length -2)){setUsedQuestions([])}; 
    //Chooses a random question from questionArray
    let randomlyChosenQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    // checks whether the random question has been used. If not, adds to usedQuestions and returns it
    const isObjectInArray = usedQuestions.some((item) => {
      // Compare based on object properties
      return item.question === randomlyChosenQuestion.question;
    }); 
    console.log(`for item ${randomlyChosenQuestion.question} isObjectInArray has value:`, isObjectInArray)
    if (isObjectInArray) {
      randomQuestion(questionArray);  
      
    }
    
    // otherwise goes looking for a random question again. 
    else {
      console.log("this shouldn't be happening");
      setUsedQuestions([...usedQuestions,randomlyChosenQuestion]); 
      return randomlyChosenQuestion;
    }
  }
  

  //handing the array to the established function into a variable to be passed down as props to the necessary parts
  useEffect(() => {
    const qObject = randomQuestion(quizQuestions);
    setQuestionObject(qObject);
  },[])

  return (
    <div>
      <QuestionDisplay questionObject={questionObject} />
    </div>
  );
}
