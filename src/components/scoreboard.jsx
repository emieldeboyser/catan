import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Scoreboard() {
  const [scores, setScores] = React.useState([]);
  const navigate = useNavigate();

  const fetchScores = async () => {
    try {
      const res = await fetch(
        "https://catan-server-nodejs-production.up.railway.app/api/scores"
      );
      const data = await res.json();
      setScores(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://catan-server-nodejs-production.up.railway.app/api/scores/${id}`
      );
      if (res.status === 200) {
        fetchScores();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderScoreboard = scores.map((game, index) => {
    const points = Object.values(game.points);
    const gameName = game.gameName;

    const renderPlayerNames = game.players
      ? Object.entries(game.players).map(([key, value], idx) => {
          const highestValue = Math.max(...points);
          const isHighest = points[idx] === highestValue;
          return (
            <p
              key={`${gameName} ${key}`}
              className={isHighest ? "font-bold text-green-600" : ""}
            >
              {value}: {points[idx]}
            </p>
          );
        })
      : null;

    const totalThrows = () => {
      return Object.values(game.diceCounter).reduce(
        (sum, count) => sum + count,
        0
      );
    };

    const mostThrown = () => {
      const [mostOutcome, mostCount] = Object.entries(game.diceCounter).reduce(
        ([outcome, count], [key, value]) =>
          value > count ? [key, value] : [outcome, count],
        ["", 0]
      );
      return `${mostOutcome} was thrown ${mostCount} times`;
    };

    const leastThrown = () => {
      const [leastOutcome, leastCount] = Object.entries(
        game.diceCounter
      ).reduce(
        ([outcome, count], [key, value]) =>
          value < count ? [key, value] : [outcome, count],
        ["", Infinity]
      );
      return leastCount === Infinity
        ? "No outcome was thrown"
        : `${leastOutcome} was thrown ${leastCount} times`;
    };

    return (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-6 mb-6 w-['120px]"
        onClick={() => navigate(`/scoreboard/${game._id}`)}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {game.gameName}
          </h3>
          <button
            onClick={() => handleDelete(game._id)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            Delete
          </button>
        </div>
        <p className="text-gray-600">
          {new Date(game.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </p>
        <p className="text-gray-800">
          {new Date(game.date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-gray-800 mt-2">Players:</p>
        <div className="pl-4">{renderPlayerNames}</div>
        <p className="text-gray-800 mt-2">Winner: {game.winner}</p>
        <p className="text-gray-800">Total throws: {totalThrows()}</p>
        <p className="text-gray-800">{mostThrown()}</p>
        <p className="text-gray-800">{leastThrown()}</p>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Scoreboard</h2>
      {scores.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">No games played yet</p>
        </div>
      ) : (
        <div className="flex flex-row">{renderScoreboard}</div>
      )}
    </div>
  );
}

export default Scoreboard;
