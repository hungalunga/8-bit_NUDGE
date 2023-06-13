// import logo from './logo.svg';

import "./App.css";
import PromptQuiz from "./PromptQuiz/PromptQuiz";


function App() {
  return (
    <div className="App">
      <header className="App-header">

        NUDGE
        <div className="Profile">
          <h2>Welcome Back</h2>
          <h3>UserName</h3>
        </div>
        <div className="Quiz">
          <button className="Quiz-button">Quiz</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Learn React
      </header>
      <PromptQuiz />
    </div>
  );
}

export default App;
