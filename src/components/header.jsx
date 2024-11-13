import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const game = localStorage.getItem("game");
  return (
    <>
      <nav className="navigation h-10 bg-white px-3 py-2 flex justify-between border-b-[1px] border-black">
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faCoffee} color="rgb(96 165 250)" />
          <h1>
            <a href="/" className="text-blue-400">
              Catan counter
            </a>
          </h1>
        </div>
        <div className="flex gap-2">
          <a href="/" className="text-sm">
            Make Game
          </a>
          {game && (
            <a href="/diceCounter" className="text-sm">
              Dice Counter
            </a>
          )}
          {game && (
            <a href="/scoreboard" className="text-sm">
              Scoreboard
            </a>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
