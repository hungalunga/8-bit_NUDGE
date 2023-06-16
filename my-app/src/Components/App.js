import { Route, Routes} from "react-router-dom";
import "./App.css";
import PromptQuiz from "./PromptQuiz/PromptQuiz";
import MainQuiz from "./MainQuiz/MainQuiz";
import Dashboard from "./Dashboard/Dashboard";
import { Menubar } from "primereact/menubar";
import PromptQuizDisplay from "./PromptQuizDisplay/PromptQuizDisplay";
import "primeicons/primeicons.css";
import "../theme.css"

function App() {
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "/home";
      },
    },
    {
      label: "Quiz",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        window.location = "/quiz";
      },
    },
  ];
  return (
    <>
      <div className="App">
        <header className="App-header">NUDGE</header>
        <PromptQuiz />
        <Menubar className= "menubar" model={items} />
      </div>
      <Routes>
        <Route path="/quiz" element={<MainQuiz />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/daily-quiz" element={<PromptQuizDisplay />} />
      </Routes>
    </>
  );
}

export default App;
