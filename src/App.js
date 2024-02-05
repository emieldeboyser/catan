import MakeGameComponent from "./components/game";
import DiceCounter from "./components/diceCounter";
import EndGame from "./components/endGame";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const game = localStorage.getItem("game");

  return (
    <div className="App">
      <nav className="navigation">
        <h1>
          <a href="/">Catan</a>
        </h1>
        <p>test</p>
        <div>
          <a href="/">Make Game</a>
          {game && <a href="/diceCounter">Dice Counter</a>}
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<MakeGameComponent />} />
          {game && <Route path="/diceCounter" element={<DiceCounter />} />}
          <Route path="/endGame" element={<EndGame />} />
        </Routes>
      </Router>
      <footer>
        <p> &copy; 2024 Catan</p>
        <p>Made by Emiel Deboyser</p>
      </footer>
    </div>
  );
}

export default App;
