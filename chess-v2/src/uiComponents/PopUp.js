import { React } from "react";
import "./PopUp.css";
import { STRINGS } from "../data/stringEnums";

const PopUp = (props) => {
  let popUpText;
  if (props.WRONG_TURN) {
    popUpText = props.WRONG_TURN
        ? STRINGS.WRONG_TURN
        : STRINGS.ILLEGAL_MOVE;
  } else if (props.IN_CHECK === "whiteInCheck" || props.IN_CHECK === "blackInCheck") {
    popUpText = props.IN_CHECK === "whiteInCheck" ? STRINGS.WHITE_IN_CHECK : STRINGS.BLACK_IN_CHECK;
  } else {
    popUpText = props.GAME_WON === "whiteWon" ? STRINGS.WHITE_WON : STRINGS.BLACK_WON;
  }

  return (
    <span className="PopUpContainer">
      <div className="PopUp">{popUpText}</div>
    </span>
  );
};

export default PopUp;
