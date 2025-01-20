import React, { useState, useEffect } from "react";
import { formatTime } from "../utils/formattime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Stopwatch = ({ start, stop }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (start) {
      handleStart();
    } else if (stop) {
      handleStop();
    }
  }, [start, stop]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    localStorage.setItem("time", JSON.stringify(time));
  };

  const handleResume = () => {
    setIsActive(true);
  };

  return (
    <div className="bg-white border border-black w-60 flex flex-col rounded-lg p-5 gap-2">
      <div className="flex justify-between align-baseline">
        <h1>Stopwatch</h1>
        <FontAwesomeIcon icon={faClock} />
      </div>
      <div className="border-y-2 border-white bg-slate-100">
        {formatTime(time)}
      </div>
      <div className="w-100 flex justify-between">
        {isActive ? (
          <button
            onClick={handleStop}
            className="bg-red-300 p-3 rounded-lg w-full"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="bg-green-300 p-3 rounded-lg w-full"
          >
            Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
