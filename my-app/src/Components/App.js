// import logo from './logo.svg';

import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import MainQuiz from "./MainQuiz/MainQuiz";
import Dashboard from "./Dashboard/Dashboard";


function App() {


  return (
    <>
    <div className="App">
      <header className="App-header">
        NUDGE
      </header>
      <PromptQuiz />
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
        </ul>
      </nav>
      <Dashboard />
    </div>
    <Routes>
      <Route path="/quiz" element={<MainQuiz />} />
      <Route path="/home" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
