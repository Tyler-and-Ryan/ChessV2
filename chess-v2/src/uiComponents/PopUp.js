import { React, Fragment, useEffect, useRef, useState } from "react";
import "./PopUp.css";
import { STRINGS } from "../data/stringEnums";

const PopUp = (props) => {
  console.log("props.WRONG_TURN: " + props.WRONG_TURN);
  const popUpText = props.WRONG_TURN
    ? STRINGS.WRONG_TURN
    : STRINGS.ILLEGAL_MOVE;

  return (
    <span className="PopUpContainer">
      <div className="PopUp">{popUpText}</div>
    </span>
  );
};

export default PopUp;
