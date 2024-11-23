import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "./atoms/country";

const Header = () => {
  const game = localStorage.getItem("game"); // Check if a game exists in localStorage
  const { t, i18n } = useTranslation(); // Use the translation hook
  const taal = localStorage.getItem("taal"); // Get the current language from localStorage

  // If `taal` is null, return null to prevent rendering the component
  if (taal === null) {
    return null;
  }

  // // Change language if taal is available and different from current language
  // if (taal && i18n.language !== taal) {
  //   i18n.changeLanguage(taal);
  // }

  return (
    <nav className="navigation h-10 bg-white px-3 py-2 flex justify-between absolute w-screen">
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faDice} color="black" />
        <h1>
          <a href="/" className="">
            {t("spel.logo")}
          </a>
        </h1>
      </div>
      <div className="flex gap-2">
        <a href="/" className="text-sm">
          {t("nav.makeGame")}
        </a>
        {game && (
          <a href="/diceCounter" className="text-sm">
            {t("nav.DiceCounter")}
          </a>
        )}
        {game && (
          <a href="/scoreboard" className="text-sm">
            {t("nav.Scoreboard")}
          </a>
        )}
      </div>
      {/* <ChangeLanguage currentLanguage={taal} /> */}
    </nav>
  );
};

export default Header;
