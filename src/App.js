import MakeGameComponent from "./components/game";
import DiceCounter from "./components/diceCounter";
import EndGame from "./components/endGame";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const game = localStorage.getItem("game");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MakeGameComponent />} />
          {game && <Route path="/diceCounter" element={<DiceCounter />} />}
          <Route path="/endGame" element={<EndGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
