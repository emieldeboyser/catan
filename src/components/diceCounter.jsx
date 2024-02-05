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
  const [totalThrows, setTotalThrows] = useState(0);
  const [lastDigitPressed] = useState([]);

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
    return <div className="line" style={{ height: `${count}rem` }}></div>;
  };

  const renderCalculator = (number, setCount) => {
    const handleButtonClick = () => {
      lastDigitPressed.unshift(number);
      setCount((prevCount) => prevCount + 1);
      if (lastDigitPressed.length === 1) {
        startStopwatch();
      }
    };
    return (
      <button className="calculatorBtn" onClick={handleButtonClick}>
        {number}
      </button>
    );
  };

  const renderTable = (number, count) => {
    if (count <= 1) {
      return (
        <div className="button">
          <div className="buttonContainer">
            <p className="addButton">{number}</p>
          </div>
          <div className="linee">
            <p className="hidden">{count}</p>
            {renderLine(count)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="button">
          <div className="buttonContainer">
            <p className="addButton">{number}</p>
          </div>
          <div className="linee">
            <p>{count}</p>
            {renderLine(count)}
          </div>
        </div>
      );
    }
  };

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

  const deleteLastDigit = () => {
    console.log(lastDigitPressed);
    console.log(lastDigitPressed[0]);
    if (lastDigitPressed[0] === "2") {
      setTwo((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "3") {
      setThree((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "4") {
      setFour((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "5") {
      setFive((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "6") {
      setSix((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "7") {
      setSeven((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "8") {
      setEight((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "9") {
      setNine((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "10") {
      setTen((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "11") {
      setEleven((prevCount) => prevCount - 1);
    } else if (lastDigitPressed[0] === "12") {
      setTwelve((prevCount) => prevCount - 1);
    }
    lastDigitPressed.shift();
  };

  console.log(lastDigitPressed);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="diceCounter">
      <div>
        <h1>Stopwatch</h1>
        <p>Time: {formatTime(time)}</p>
        <button onClick={stopStopwatch}>Pauze</button>
      </div>

      <div className="hero">
        <div className="graphic">
          {renderTable("2", two)}
          {renderTable("3", three)}
          {renderTable("4", four)}
          {renderTable("5", five)}
          {renderTable("6", six)}
          {renderTable("7", seven)}
          {renderTable("8", eight)}
          {renderTable("9", nine)}
          {renderTable("10", ten)}
          {renderTable("11", eleven)}
          {renderTable("12", twelve)}
        </div>
        <div className="input">
          {lastDigitPressed == 0 ? (
            <p>Press dice to start game</p>
          ) : (
            <p>{lastDigitPressed[0]}</p>
          )}
          <div className="firstRow row">
            {renderCalculator("2", setTwo)}
            {renderCalculator("3", setThree)}
            {renderCalculator("4", setFour)}
          </div>
          <div className="secondRow row">
            {renderCalculator("5", setFive)}
            {renderCalculator("6", setSix)}
            {renderCalculator("7", setSeven)}
          </div>
          <div className="thirdRow row">
            {renderCalculator("8", setEight)}
            {renderCalculator("9", setNine)}
            {renderCalculator("10", setTen)}
          </div>
          <div className="fourthRow row">
            {renderCalculator("11", setEleven)}
            {renderCalculator("12", setTwelve)}
            <button
              className="calculatorBtn"
              onClick={deleteLastDigit}
              disabled={lastDigitPressed == 0}
            >
              -
            </button>
          </div>
        </div>
      </div>

      <div className="gameStats">
        <p>Total throws: {totalThrows}</p>
      </div>
    </div>
  );
}

export default DiceCounter;
