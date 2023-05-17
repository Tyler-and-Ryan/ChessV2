import React, { Fragment, useContext } from "react";
import ChessBoard from "./ChessBoard.js";
import UserContext from "./store/user-context.js";
import Button from "./uiComponents/Button.js";
import { BUTTON_TYPES, STRINGS } from "./data/stringEnums.js";
import "./App.css";

const App = () => {
  const ctx = useContext(UserContext);
  return (
    <Fragment>
      <header className="App-header">
        <div className="btn-wrapper">
          <Button
            type={BUTTON_TYPES.PRIMARY}
            onClick={ctx.swapPlayerColor}
            text={STRINGS.START}
          ></Button>
          <div>{STRINGS.TITLE}</div>
          <Button
            type={BUTTON_TYPES.PRIMARY}
            onClick={() => {}}
            text={STRINGS.RESET}
          ></Button>
        </div>
      </header>
      <div className="App-body">
        <div>
          <ChessBoard />
        </div>
      </div>
      <footer className="App-footer">
        <p>
          Developed by{" "}
          <a
            href="https://linkedin.com/in/ryan-watson-4a8690213"
            target="_blank"
            rel="noreferrer"
          >
            Ryan Watson
          </a>
        </p>
        <p>
          Chess Board Piece Images from{" "}
          <a
            href="https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces"
            target="_blank"
            rel="noreferrer"
          >
            Wikimedia Commons
          </a>
        </p>
      </footer>
    </Fragment>
  );
};

export default App;
