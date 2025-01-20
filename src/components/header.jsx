import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = ({ inGame }) => {
  const [game, setGame] = useState(false); // Check if a game exists in localStorage
  const { t } = useTranslation(); // Use the translation hook

  useEffect(() => {
    if (inGame) {
      setGame(true);
    }
  }, []);

  return (
    <nav className="navigation h-10 bg-white px-3 py-2 flex top-0 justify-between absolute w-screen">
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faDice} color="black" />
        <h1>
          <a href="/" className="">
            {t("spel.logo")}
          </a>
        </h1>
      </div>
      <div className="flex gap-2">
        {game && (
          <>
            <a href="/diceCounter" className="text-sm">
              {t("nav.DiceCounter")}
            </a>
            <a href="/scoreboard" className="text-sm">
              {t("nav.Scoreboard")}
            </a>
          </>
        )}
      </div>
      {/* <ChangeLanguage currentLanguage={taal} /> */}
    </nav>
  );
};

export default Header;
