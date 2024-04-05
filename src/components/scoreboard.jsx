import React from "react";
import scoreboardData from "./../scoreBoardData.json";
import "./scoreboard.css";
import crown from "./../crown.svg";

function Scoreboard() {
  const sortByDate = scoreboardData.sort((a, b) => {
    return a.date - b.date;
  });

  const deleteGame = (index) => {
    scoreboardData.splice(index, 1);
  };

  const renderScoreboard = sortByDate.map((game, index) => {
    const points = Object.values(game.points); // Convert points object to an array
    const gameName = game.gameName;

    const renderPlayerNames = game.players
      ? Object.entries(game.players).map(([key, value], index) => {
          const highestValue = Math.max(...points);
          const isHighest = points[index] === highestValue;
          console.log(isHighest);
          return (
            <p key={`${gameName} ${key}`}>
              {isHighest ? <span>{value}</span> : value}: {points[index]}
            </p>
          );
        })
      : null;

    const totalThrows = () => {
      let totalThrows = 0;
      const diceCounter = game.diceCounter;
      for (const outcome in diceCounter) {
        totalThrows += diceCounter[outcome];
      }
      return totalThrows;
    };

    const mostThrown = () => {
      let mostThrown = 0;
      let outcome = "";
      const diceCounter = game.diceCounter;
      for (const key in diceCounter) {
        if (diceCounter[key] > mostThrown) {
          mostThrown = diceCounter[key];
          outcome = key;
        }
      }
      const outcomeMapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
      };
      if (outcomeMapping.hasOwnProperty(outcome)) {
        outcome = outcomeMapping[outcome];
      }
      return `${outcome} was thrown ${mostThrown} times`;
    };

    const leastThrown = () => {
      let leastThrown = Infinity; // Initialize to a high value
      let outcome = "";
      const diceCounter = game.diceCounter;
      for (const key in diceCounter) {
        if (diceCounter[key] < leastThrown) {
          leastThrown = diceCounter[key];
          outcome = key;
        }
      }
      const outcomeMapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
      };
      if (outcomeMapping.hasOwnProperty(outcome)) {
        outcome = outcomeMapping[outcome];
      }

      if (leastThrown === Infinity) {
        return "No outcome was thrown";
      } else {
        return `${outcome} was thrown ${leastThrown} times`;
      }
    };

    return (
      <div key={index} className="card">
        <button
          onClick={() => {
            deleteGame(index);
          }}
        >
          delete game
        </button>
        <h3>{game.gameName}</h3>
        <p>
          Date:{" "}
          {new Date(game.date).toLocaleTimeString() +
            " " +
            new Date(game.date).toLocaleDateString()}
        </p>
        <p>Players: {renderPlayerNames}</p>
        <p>Winner: {game.winner}</p>
        <p>Total throws: {totalThrows()}</p>
        <p>{mostThrown()}</p>
        <p>{leastThrown()}</p>
      </div>
    );
  });

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <div className="cardContainer">{renderScoreboard}</div>
    </div>
  );
}

export default Scoreboard;
