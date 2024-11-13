import React, { useEffect, useState } from "react";

function DiceCounter({ data }) {
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

  // Use useEffect to initialize state from data prop
  useEffect(() => {
    if (data) {
      setTwo(data.two);
      setThree(data.three);
      setFour(data.four);
      setFive(data.five);
      setSix(data.six);
      setSeven(data.seven);
      setEight(data.eight);
      setNine(data.nine);
      setTen(data.ten);
      setEleven(data.eleven);
      setTwelve(data.twelve);
    }
  }, [data]);

  const renderLine = (count) => {
    return (
      <div
        className="bg-blue-500 w-4 rounded-lg"
        style={{ height: `${count}rem` }}
      ></div>
    );
  };

  const renderTable = (number, count) => {
    return (
      <div className="flex flex-col items-center my-4">
        <p className="text-black text-center text-sm">{count}</p>
        {renderLine(count)}
        <p className="text-lg font-semibold text-black">{number}</p>
      </div>
    );
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

  return (
    <div className="p-4">
      <div className="hero bg-gray-700 p-6 rounded-lg shadow-lg flex w-full justify-center">
        <div className="graphic grid grid-cols-12 gap-4 bg-blue-900">
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
      </div>
      <div className="text-black">
        <p>Total throws: {totalThrows}</p>
      </div>
    </div>
  );
}

export default DiceCounter;
