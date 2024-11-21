import React, { useState } from "react";
import "./game.css";
import Inputveld from "./atoms/inputveld";
import Button from "./atoms/button";
import bg from "../images/bg.jpg";

const Game = () => {
  const [inputFields, setInputFields] = useState([
    { id: "player1", value: "", placeholder: "Player 1" },
    { id: "player2", value: "", placeholder: "Player 2" },
  ]);
  const [game, setGame] = useState({
    gameName: "",
    date: Date.now(),
  });

  // Handle changes in the input fields
  const handleChange = (e) => {
    if (e.target.id === "gameName") {
      setGame({ ...game, gameName: e.target.value });
      return;
    }

    const { name, value } = e.target; // Destructure to get the name and value from the input event
    console.log(name, value); // Debugging: log name and value to the console

    setInputFields((prevInputFields) =>
      prevInputFields.map(
        (inputField) =>
          inputField.id === name ? { ...inputField, value } : inputField // Update the specific input field by id
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the game object with the input field values
    const updatedGame = {
      ...game,
      ...inputFields.reduce((acc, { id, value }) => {
        acc[id] = value; // Set player values dynamically
        return acc;
      }, {}),
    };
    localStorage.setItem("game", JSON.stringify(updatedGame));
    window.location.href = "/diceCounter";
  };

  const deleteInput = (id) => {
    if (inputFields.length === 2) return;
    setInputFields((prevInputFields) =>
      prevInputFields.filter((inputField) => inputField.id !== id)
    );
  };

  const addInput = () => {
    if (inputFields.length >= 6) return;
    setInputFields((prevInputFields) => [
      ...prevInputFields,
      {
        id: `player${prevInputFields.length + 1}`,
        value: "",
        placeholder: `Player ${prevInputFields.length + 1}`,
      },
    ]);
  };

  const backgroundStyle = {
    backgroundImage: `url(${bg})`, // Use the imported image here
    backgroundSize: "cover", // Ensure the image covers the entire screen
    backgroundPosition: "center", // Position the image in the center
    minHeight: "100vh", // Ensure the image covers the whole height of the screen
  };

  return (
    <div className="app" style={backgroundStyle}>
      <h1 className="text-4xl text-center font-bold pt-14 mb-10">Game</h1>
      <div className="flex flex-col mx-96 bg-white rounded-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-12 gap-3"
        >
          <Inputveld
            value={game.gameName}
            onChange={handleChange}
            placeholder="Game Name"
            id="gameName"
            hideClose={true}
          />
          {inputFields.map((inputField, index) => (
            <div
              key={inputField.id}
              className="flex flex-row items-center gap-3"
            >
              <Inputveld
                value={inputField.value}
                onChange={handleChange}
                placeholder={inputField.placeholder}
                id={inputField.id}
                name={inputField.id} // Ensure the name matches the id
                deleteInput={() => deleteInput(inputField.id)}
              />
            </div>
          ))}

          <Button>Start</Button>
        </form>
        <Button onClick={addInput}>Add Player</Button>
      </div>
    </div>
  );
};

export default Game;
