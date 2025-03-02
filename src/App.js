import MakeGameComponent from "./components/game";
import DiceCounter from "./components/diceCounter";
import EndGame from "./components/endGame";
import Scoreboard from "./components/scoreboard";
import ScoreboardElement from "./components/ScoreboardElement";
import "./App.css";

import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom"; // useLocation imported
import Header from "./components/header";
import Footer from "./components/footer";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Wrap the entire app in BrowserRouter */}
      <AppWithHeader />{" "}
      {/* Use a child component to handle conditional rendering of Header */}
    </BrowserRouter>
  );
}

// Child component to handle conditional rendering based on current route
function AppWithHeader() {
  const location = useLocation(); // Now it works because it's inside BrowserRouter

  const taal = localStorage.setItem("taal", "be");

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App h-screen">
        {/* Conditionally render the Header only when the path is '/' */}
        {location.pathname === "/" && <Header />}
        {/* Show header only on the home route */}
        <Routes>
          <Route path="/" element={<MakeGameComponent />} />
          <Route path="/diceCounter" element={<DiceCounter />} />
          <Route path="/endGame" element={<EndGame />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/scoreboard/:id" element={<ScoreboardElement />} />
        </Routes>
        <Footer />
      </div>
    </I18nextProvider>
  );
}

export default App;
