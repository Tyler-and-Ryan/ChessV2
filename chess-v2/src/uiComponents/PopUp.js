import { React, Fragment, useEffect, useRef, useState } from "react";
import "./PopUp.css";
import { STRINGS } from "../data/stringEnums";

const PopUp = (props) => {
  const popUpText = props.WRONG_TURN
    ? STRINGS.WRONG_TURN
    : STRINGS.ILLEGAL_MOVE;

  const closePopUpHandler = () => {
    // let currentOpacity = 1.0;
    // console.log(container);
    // console.log("container.current: " + JSON.stringify(container.current.style));
    // container.current.style.opacity = "" + currentOpacity;
    // for (let i = 10; i <= 100; i+= 10) {
    //     setTimeout(() => {
    //         currentOpacity = currentOpacity - (i * 0.01);
    //         container.current.style.opacity = "" + currentOpacity;
    //     }, 300);
    // }
    props.closePopUp();
  };
  return (
    <span className="PopUpContainer">
      <div className="PopUp">{popUpText}</div>
    </span>
  );
};

export default PopUp;
