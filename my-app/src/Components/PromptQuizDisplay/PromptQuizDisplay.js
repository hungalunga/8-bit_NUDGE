import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../PromptQuestionTimer/PromptQuestionTimer";
import PromptQuizCorrect from "../PromptQuizCorrect/PromptQuizCorrect";
import PromptQuizIncorrect from "../PromptQuizIncorrect/PromptQuizIncorrect";
// import { Button } from "primereact/button";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import "../MainQuiz/MainQuiz.css";

export default function PromptQuizDisplay(props) {
  const [withinTime, setWithinTime] = useState(true);
  const [seconds, setSeconds] = useState(60);

  const questionObject = props.questionObject; // to pass down to AnswerCheckbox
  const question = questionObject.question; // to grab the question to display

  const value = (seconds / 60) * 100;

  // Sets the new results, new question when Next is pressed

  // if the questionObject is empty, display loading
  if (props.questionObject && Object.keys(props.questionObject).length === 0) {
    return <div>loading...</div>;
  }

  if (typeof props.questionObject === "object" && props.resultsValue === 0) {
    return (
      <>
        {/* need to write functionality so prompt occurs asking 'are you sure/you'll lose your progress' when X is clicked */}

        <div className="content-container">
          <div className="timer-container">
            <ProgressBar className="timer-bar" value={value}></ProgressBar>
            {props.promptQuestionTimer && (
              <PromptQuestionTimer seconds={seconds} setSeconds={setSeconds} />
            )}
          </div>
          <Card className="big-card">
            {question}
            <TextToSpeech speech={`${questionObject.question}`} />
          </Card>
          {/*<p className="question"></p>*/}
          <AnswerCheckbox
            questionObject={questionObject}
            wrongAnswers={questionObject.wrong_answers}
            id={questionObject.id}
            question={questionObject.question}
            correctAnswer={questionObject.answer}
            questionNumber={props.questionNumber}
            setQuestionNumber={props.setQuestionNumber}
            // ^^send questionNumber props down to re-render after each answer
            resultsValue={props.resultsValue}
            setResultsValue={props.setResultsValue}
            incorrectAnswers={props.incorrectAnswers}
            setIncorrectAnswers={props.setIncorrectAnswers}
            setWithinTime={setWithinTime}
            withinTime={withinTime}
            seconds={seconds}
          />
        </div>
      </>
    );
  } else if (props.resultsValue === 1) {
    return (
      <div className="MainQuiz">
        <PromptQuizCorrect
          supabase={props.supabase}
          session={props.session}
          withinTime={withinTime}
          seconds={seconds}
          streak={props.streak}
          setStreak={props.setStreak}
          totalScore={props.totalScore}
          setTotalScore={props.setTotalScore}
          streakCount={props.streakCount}
          setStreakCount={props.setStreakCount}
        />
      </div>
    );
  } else if (props.resultsValue === -1) {
    return (
      <div className="MainQuiz">
        <PromptQuizIncorrect
          supabase={props.supabase}
          session={props.session}
          questionObject={questionObject}
          withinTime={withinTime}
          seconds={seconds}
          streak={props.streak}
          setStreak={props.setStreak}
          totalScore={props.totalScore}
          setTotalScore={props.setTotalScore}
          streakCount={props.streakCount}
          setStreakCount={props.setStreakCount}
          correctAnswer={questionObject.answer}
          question={questionObject.question}
        />
      </div>
    );
  } else {
  }
  if (typeof props.questionObject === "object" && props.resultsValue === 0) {
    return (
      <div className="mainQuiz">
        <div className="timer">
          <ProgressBar value={value}></ProgressBar>
          {props.promptQuestionTimer && (
            <PromptQuestionTimer seconds={seconds} setSeconds={setSeconds} />
          )}
        </div>
        <Card className="big-card">{question}</Card>
        {/*<p className="question"></p>*/}

        <AnswerCheckbox
          questionObject={questionObject}
          wrongAnswers={questionObject.wrong_answers}
          id={questionObject.id}
          question={questionObject.question}
          correctAnswer={questionObject.answer}
          questionNumber={props.questionNumber}
          setQuestionNumber={props.setQuestionNumber}
          // ^^send questionNumber props down to re-render after each answer
          resultsValue={props.resultsValue}
          setResultsValue={props.setResultsValue}
          incorrectAnswers={props.incorrectAnswers}
          setIncorrectAnswers={props.setIncorrectAnswers}
          setWithinTime={setWithinTime}
          withinTime={withinTime}
          seconds={seconds}
        />
      </div>
    );
  } else if (props.resultsValue === 1) {
    return (
      <div className="MainQuiz">
        <PromptQuizCorrect
          withinTime={withinTime}
          seconds={seconds}
          late={props.late}
        />
      </div>
    );
  } else if (props.resultsValue === -1) {
    return (
      <div className="MainQuiz">
        <PromptQuizIncorrect
          questionObject={questionObject}
          withinTime={withinTime}
          seconds={seconds}
          late={props.late}
        />
      </div>
    );
  } else {
  }
}
