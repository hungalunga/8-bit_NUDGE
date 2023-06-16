// import logo from './logo.svg';
import React from "react"
import "./App.css";
import MainQuiz from "./MainQuiz/MainQuiz"


function App() {
  return (
    <div className="App">
      <header className="App-header">

        NUDGE
        <div className="Profile">
        </div>
        <div className="Quiz">
          <button className="Quiz-button">Quiz</button>
        </div>

      </header>
      
      <div>
        <MainQuiz/>
      </div>
    </div>
  );
}

export default App;
