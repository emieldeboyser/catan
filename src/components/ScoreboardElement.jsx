import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ScoreboardElement = () => {
  const { id } = useParams();
  const [scores, setScores] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/scores/${id}`);
      const data = res.data;
      console.log(data);
      setScores(data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchScores(id);
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Scoreboard</h1>

      {isLoaded ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {scores.gameName}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p className="font-medium">Player 1:</p>
            <p>
              {scores.player1} ({scores.points.player1} points)
            </p>

            <p className="font-medium">Player 2:</p>
            <p>
              {scores.player2} ({scores.points.player2} points)
            </p>

            <p className="font-medium">Player 3:</p>
            <p>
              {scores.player3} ({scores.points.player3} points)
            </p>

            <p className="font-medium">Player 4:</p>
            <p>
              {scores.player4} ({scores.points.player4} points)
            </p>
          </div>

          <p className="text-lg font-bold text-green-600">
            Winner: {scores.winner}
          </p>
          <p className="text-gray-500 italic">{scores.notes}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default ScoreboardElement;
