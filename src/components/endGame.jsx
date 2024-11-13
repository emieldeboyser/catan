import React, { useState } from "react";
import axios from "axios";

function EndGame() {
  const [winner, setWinner] = useState();
  const [pointsPlayer1, setPointsPlayer1] = useState(0);
  const [pointsPlayer2, setPointsPlayer2] = useState(0);
  const [pointsPlayer3, setPointsPlayer3] = useState(0);
  const [pointsPlayer4, setPointsPlayer4] = useState(0);
  const [note, setNote] = useState("");

  const game = JSON.parse(localStorage.getItem("game"));

  const diceCounter = JSON.parse(localStorage.getItem("diceCounter"));

  const sentToDB = async (e) => {
    e.preventDefault();
    const stats = {
      gameName: game.gameName,
      player1: game.player1,
      player2: game.player2,
      player3: game.player3,
      player4: game.player4,
      winner: winner,
      diceCounter,
      date: Date.now(),
      points: {
        player1: pointsPlayer1,
        player2: pointsPlayer2,
        player3: pointsPlayer3,
        player4: pointsPlayer4,
      },
      notes: note,
    };

    try {
      const res = await axios.post("http://localhost:3001/api/scores", stats);
      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPointsPP = (player, setPoints) => {
    return (
      <div>
        <label>Points of {player}</label>
        <input
          type="number"
          name={player}
          id={player}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </div>
    );
  };

  function analyzeThrows(throws) {
    // Extract keys and values from the object
    const keys = Object.keys(throws);
    const values = Object.values(throws);

    // Track the total sum and initialize variables for most and least thrown
    let totalSum = 0;
    let mostThrownKey = keys[0];
    let leastThrownKey = keys[0];

    // Loop through the values to calculate total sum and find most and least thrown keys
    values.forEach((count, index) => {
      totalSum += count;

      if (count > throws[mostThrownKey]) {
        mostThrownKey = keys[index];
      }

      if (count < throws[leastThrownKey]) {
        leastThrownKey = keys[index];
      }
    });

    // Calculate the average
    const average = totalSum / values.length;

    // Return the results
    return {
      mostThrown: {
        key: mostThrownKey,
        count: throws[mostThrownKey],
      },
      leastThrown: {
        key: leastThrownKey,
        count: throws[leastThrownKey],
      },
      average: average,
    };
  }

  return (
    <div>
      <h1>Stats</h1>
      <h2>{game.gameName}</h2>
      <h3>Players</h3>
      <ul>
        <li>{game.player1}</li>
        <li>{game.player2}</li>
        <li>{game.player3}</li>
        <li>{game.player4}</li>
      </ul>

      <h4>Most thrown</h4>
      <p>
        {analyzeThrows(diceCounter).mostThrown.key} was thrown{" "}
        {analyzeThrows(diceCounter).mostThrown.count} times
      </p>
      <h4>Least thrown</h4>
      <p>
        {analyzeThrows(diceCounter).leastThrown.key} was thrown{" "}
        {analyzeThrows(diceCounter).leastThrown.count} times
      </p>
      <h4>Average</h4>
      <p>{analyzeThrows(diceCounter).average}</p>

      <h3>Who won?</h3>
      <form onSubmit={sentToDB}>
        <label htmlFor="winner">Winner</label>
        <select
          name="winner"
          id="winner"
          onChange={(e) => setWinner(e.target.value)}
        >
          <option value="">---</option>
          <option value="player1">{game.player1}</option>
          <option value="player2">{game.player2}</option>
          <option value="player3">{game.player3}</option>
          <option value="player4">{game.player4}</option>
        </select>

        {renderPointsPP(game.player1, setPointsPlayer1)}
        {renderPointsPP(game.player2, setPointsPlayer2)}
        {renderPointsPP(game.player3, setPointsPlayer3)}
        {renderPointsPP(game.player4, setPointsPlayer4)}

        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EndGame;
