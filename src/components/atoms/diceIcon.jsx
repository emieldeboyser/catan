import React from "react";
import { faDiceOne } from "@fortawesome/free-solid-svg-icons";
import { faDiceTwo } from "@fortawesome/free-solid-svg-icons";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";
import { faDiceFour } from "@fortawesome/free-solid-svg-icons";
import { faDiceFive } from "@fortawesome/free-solid-svg-icons";
import { faDiceSix } from "@fortawesome/free-solid-svg-icons";
import { faHandcuffs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DiceIcon = ({ dice }) => {
  console.log(dice);

  const diceFaces = {
    one: faDiceOne,
    two: faDiceTwo,
    three: faDiceThree,
    four: faDiceFour,
    five: faDiceFive,
    six: faDiceSix,
    seven: faHandcuffs,
    eight: faDiceTwo,
    nine: faDiceThree,
    ten: faDiceFour,
    eleven: faDiceFive,
    twelve: faDiceSix,
  };

  return (
    <div style={{ fontSize: "2rem" }}>
      <FontAwesomeIcon icon={diceFaces[dice]} />
    </div>
  );
};

export default DiceIcon;
