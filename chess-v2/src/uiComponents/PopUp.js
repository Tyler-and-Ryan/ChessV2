import { React } from "react";
import "./PopUp.css";
import { STRINGS, BUTTON_TYPES } from "../data/stringEnums";
import Button from "./Button.js";

const PopUp = (props) => {
  let popUpText;
  let gameResultText = "";
  if (props.WRONG_TURN) {
    popUpText = props.WRONG_TURN ? STRINGS.WRONG_TURN : STRINGS.ILLEGAL_MOVE;
  } else if (
    props.IN_CHECK === "whiteInCheck" ||
    props.IN_CHECK === "blackInCheck"
  ) {
    popUpText =
      props.IN_CHECK === "whiteInCheck"
        ? STRINGS.WHITE_IN_CHECK
        : STRINGS.BLACK_IN_CHECK;
  } else {
    popUpText =
      props.GAME_WON === "whiteWon" ? STRINGS.WHITE_WON : STRINGS.BLACK_WON;
  }

  if (props.GAME_LOST) {
    gameResultText = STRINGS.GAME_LOST;
  } else if (props.GAME_WON) {
    gameResultText = STRINGS.GAME_WON;
  }

  return (
    <span className="PopUpContainer">
      <div className="PopUp">
        {gameResultText !== "" ? gameResultText : popUpText}
        {gameResultText !== "" && (
          <div>
            <Button
              type={BUTTON_TYPES.SECONDARY}
              onClick={props.leaveGame}
              text="New Match"
            />
            <Button
              type={BUTTON_TYPES.SECONDARY}
              onClick={props.closePopUp}
              text="View Board"
            />
          </div>
        )}
      </div>
    </span>
  );
};

export default PopUp;
