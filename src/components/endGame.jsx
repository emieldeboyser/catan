import React, { useState } from "react";
import axios from "axios";
import DiceIcon from "./atoms/diceIcon";

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
      const res = await axios.post(
        "https://catan-server-nodejs-production.up.railway.app/api/scores",
        stats
      );
      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPointsPP = (player, setPoints) => {
    return (
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Points of {player}
        </label>
        <input
          type="number"
          name={player}
          id={player}
          onChange={(e) => setPoints(parseInt(e.target.value))}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
        Game Stats
      </h1>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        {game.gameName}
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Players</h3>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>{game.player1}</li>
          <li>{game.player2}</li>
          <li>{game.player3}</li>
          <li>{game.player4}</li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Most Thrown</h4>
        <p className="text-lg text-gray-700 flex gap-3">
          <DiceIcon dice={analyzeThrows(diceCounter).mostThrown.key} /> was
          thrown {analyzeThrows(diceCounter).mostThrown.count} times
        </p>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Least Thrown</h4>
        <p className="text-lg text-gray-700 flex gap-3">
          <DiceIcon dice={analyzeThrows(diceCounter).leastThrown.key} /> was
          thrown {analyzeThrows(diceCounter).leastThrown.count} times
        </p>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Average</h4>
        <p className="text-lg text-gray-700">
          {analyzeThrows(diceCounter).average}
        </p>
      </div>

      <h3 className="text-xl font-medium text-gray-800 mb-4">Who won?</h3>
      <form
        onSubmit={sentToDB}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="winner"
            className="block text-lg font-medium text-gray-700"
          >
            Winner
          </label>
          <select
            name="winner"
            id="winner"
            onChange={(e) => setWinner(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">---</option>
            <option value="player1">{game.player1}</option>
            <option value="player2">{game.player2}</option>
            <option value="player3">{game.player3}</option>
            <option value="player4">{game.player4}</option>
          </select>
        </div>

        {renderPointsPP(game.player1, setPointsPlayer1)}
        {renderPointsPP(game.player2, setPointsPlayer2)}
        {renderPointsPP(game.player3, setPointsPlayer3)}
        {renderPointsPP(game.player4, setPointsPlayer4)}

        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-lg font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="6"
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EndGame;
