import MakeGameComponent from "./components/game";
import DiceCounter from "./components/diceCounter";
import EndGame from "./components/endGame";
import Scoreboard from "./components/scoreboard";
import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MakeGameComponent />} />
          <Route path="/diceCounter" element={<DiceCounter />} />
          <Route path="/endGame" element={<EndGame />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

// BIJ WIE IS HET MEESTE GESTOLEN? TODO CREDITS MAXIME VERSTUYFT
