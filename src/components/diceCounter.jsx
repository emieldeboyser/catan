import React, { useEffect, useState } from "react";

import "./diceCounter.css";

function DiceCounter() {
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);
  const [seven, setSeven] = useState(0);
  const [eight, setEight] = useState(0);
  const [nine, setNine] = useState(0);
  const [ten, setTen] = useState(0);
  const [eleven, setEleven] = useState(0);
  const [twelve, setTwelve] = useState(0);
  const [lastDigits, setLastDigits] = useState([]);
  const [lastDigitPressed, setLastDigitPressed] = useState(0);
  const [totalThrows, setTotalThrows] = useState(0);

  const sentToLocalStorage = () => {
    const diceCounter = {
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten,
      eleven,
      twelve,
    };
    localStorage.setItem("diceCounter", JSON.stringify(diceCounter));
  };

  const renderLine = (count) => {
    return <div className="line" style={{ width: `${count}0px` }}></div>;
  };

  const renderButton = (number, count, setCount) => {
    const handleButtonClick = () => {
      setCount((prevCount) => prevCount + 1);
      setLastDigitPressed(number);
    };

    return (
      <div>
        <div className="buttonContainer">
          <button
            className="minusButton"
            onClick={() => setCount((prevCount) => prevCount - 1)}
          >
            -
          </button>
          <button className="addButton" onClick={handleButtonClick}>
            {number}
          </button>
        </div>
        <div className="linee">
          {count}
          {renderLine(count)}
        </div>
      </div>
    );
  };

  // ADD LAST DIGITS USER PRESSED TO ARRAY
  useEffect(() => {
    setLastDigits((prevLastDigits) => {
      const lastDigitsCopy = [...prevLastDigits];
      lastDigitsCopy.shift();
      lastDigitsCopy.push(lastDigitPressed);
      return lastDigitsCopy;
    });
  }, [lastDigitPressed, lastDigits]);

  const endGame = () => {
    sentToLocalStorage();

    window.location.href = "/endGame";
    resetStopwatch();
  };

  const countTotal = () => {
    const total =
      two +
      three +
      four +
      five +
      six +
      seven +
      eight +
      nine +
      ten +
      eleven +
      twelve;
    setTotalThrows(total);
  };

  useEffect(() => {
    countTotal();
    // eslint-disable-next-line
  }, [two, three, four, five, six, seven, eight, nine, ten, eleven, twelve]);

  // STOPWATCH
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    localStorage.setItem("time", JSON.stringify(time));
  };

  return (
    <div className="diceCounter">
      <div className="titleContainer">
        <h1>Dice</h1>
        <button onClick={endGame}>End Game</button>
      </div>
      <div>
        <h1>Stopwatch</h1>
        <p>Time: {time} seconds</p>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Pauze</button>
      </div>
      <h2>Dice Counter</h2>
      <p>
        Last digit pushed: <b>{lastDigits}</b>
      </p>
      <p>Total times thrown: {totalThrows}</p>

      <p>Click the button to count the times each number is rolled.</p>
      {renderButton("2", two, setTwo)}
      {renderButton("3", three, setThree)}
      {renderButton("4", four, setFour)}
      {renderButton("5", five, setFive)}
      {renderButton("6", six, setSix)}
      {renderButton("7", seven, setSeven)}
      {renderButton("8", eight, setEight)}
      {renderButton("9", nine, setNine)}
      {renderButton("10", ten, setTen)}
      {renderButton("11", eleven, setEleven)}
      {renderButton("12", twelve, setTwelve)}
    </div>
  );
}

export default DiceCounter;
