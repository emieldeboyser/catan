import React from "react";

const Header = () => {
  const game = localStorage.getItem("game");
  return (
    <>
      <nav className="navigation">
        <h1>
          <a href="/">Catan</a>
        </h1>
        <div>
          <a href="/">Make Game</a>
          {game && <a href="/diceCounter">Dice Counter</a>}
          {game && <a href="/scoreboard">Scoreboard</a>}
        </div>
      </nav>
    </>
  );
};

export default Header;
