import React, { useState } from "react";
import "./game.css";

function Game() {
  const [game, setGame] = useState({
    gameName: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    date: Date.now(),
  });

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the game data
    localStorage.setItem("game", JSON.stringify(game));
    window.location.href = "/diceCounter";
  };

  return (
    <div className="app">
      <h2>Start Game</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="gameName">Game Name</label>
        <input
          type="text"
          name="gameName"
          id="gameName"
          value={game.gameName}
          onChange={handleChange}
          autoComplete="off"
        />
        <label htmlFor="player1">Player 1</label>
        <input
          type="text"
          name="player1"
          id="player1"
          value={game.player1}
          onChange={handleChange}
        />
        <label htmlFor="player2">Player 2</label>
        <input
          type="text"
          name="player2"
          id="player2"
          value={game.player2}
          onChange={handleChange}
        />
        <label htmlFor="player3">Player 3</label>
        <input
          type="text"
          name="player3"
          id="player3"
          value={game.player3}
          onChange={handleChange}
        />
        <label htmlFor="player4">Player 4</label>
        <input
          type="text"
          name="player4"
          id="player4"
          value={game.player4}
          onChange={handleChange}
        />

        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default Game;
