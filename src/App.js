import MakeGameComponent from "./components/game";
import DiceCounter from "./components/diceCounter";
import EndGame from "./components/endGame";
import Scoreboard from "./components/scoreboard";
import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import ScoreboardElement from "./components/ScoreboardElement";

function App() {
  return (
    <div className="App h-screen">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MakeGameComponent />} />
          <Route path="/diceCounter" element={<DiceCounter />} />
          <Route path="/endGame" element={<EndGame />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/scoreboard/:id" element={<ScoreboardElement />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

// BIJ WIE IS HET MEESTE GESTOLEN? TODO CREDITS MAXIME VERSTUYFT
