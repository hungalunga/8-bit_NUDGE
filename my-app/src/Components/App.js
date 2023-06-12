import react, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  const [questions, setQuestions] = useState([]);
  let database = {
		"question": "59 + 95",
		"level": "MEDIUM",
		"answer": 154,
		"wrong_answers": [54, 102, 112]
	}

  setQuestions(database);


  return (
    <div className="App">
      <header className="App-header">NUDGE
      </header>
      <div className="Profile">
      Welcome back
      <div className='UserName'>Username</div>
      
      </div>
      <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.wrong_answers.map((answer, optionIndex) => (
              <li key={optionIndex}>{answer}</li>
            ))}
            <li>{question.answer}</li>
          </ul>
        </div>
      ))}
    </div>
      <div className="Quiz">
      <iframe src="https://quizlet.com/516241505/match/embed?i=5647tq&x=1jj1" height="500" width="100%"></iframe>
        <button className="Quiz-button">Quiz</button>
      </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          Learn React
    </div>
  );
}

export default App;
