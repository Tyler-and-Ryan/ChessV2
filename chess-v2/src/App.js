import React, { Fragment, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./JoinGame.js";
import Button from "./uiComponents/Button.js";
import { BUTTON_TYPES, STRINGS } from "./data/stringEnums.js";
import "./App.css";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import PopUp from "./uiComponents/PopUp.js";
import LinkedInLogo from "./visualAssets/LinkedInLogo.png";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [isWrongTurn, setIsWrongTurn] = useState(false);
  const [isIllegalMove, setIsIllegalMove] = useState(false);
  const [whoInCheck, setWhoInCheck] = useState("");
  const [gameWon, setGameWon] = useState("");
  const [gameLost, setGameLost] = useState(false);
  const [gameActive, setGameActive] = useState(false);

  if (token && client.user === undefined) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  const logOut = () => {
    if (client) {
      console.log("logout being executed");
      cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("hashedPassword");
      cookies.remove("channelName");
      cookies.remove("username");
      client.disconnectUser();
      setIsAuth(false);
    }
  };

  /*
   * 0 = Player tried to move when it wasn't their turn
   * 1 = Player tried to perform a move that is illegal
   */
  const showPopUp = (popUpCode, player = "White") => {
    switch (popUpCode) {
      case 0:
        setIsWrongTurn(true);
        setPopUpOpen(true);
        break;
      case 1:
        setIsIllegalMove(true);
        setPopUpOpen(true);
        break;
      case 2:
        setWhoInCheck("whiteInCheck");
        setPopUpOpen(true);
        break;
      case 3:
        setWhoInCheck("blackInCheck");
        setPopUpOpen(true);
        break;
      case 4:
        setGameWon("whiteWon");
        setPopUpOpen(true);
        if (player === "Black") {
          setGameLost(true);
        } else {
          setGameLost(false);
        }
        break;
      case 5:
        setGameWon("blackWon");
        setPopUpOpen(true);
        if (player === "White") {
          setGameLost(true);
        } else {
          setGameLost(false);
        }
        break;
      default:
        console.log("something went wrong when showing the pop up");
    }
  };

  const closePopUp = () => {
    setIsWrongTurn(false);
    setIsIllegalMove(false);
    setWhoInCheck("");
    setGameWon("");
    setGameLost(false);
    setPopUpOpen(false);
  };

  const leaveGame = () => {
    closePopUp();
    setGameActive(false);
    console.log("leaveGame - setGameActive is false");
    // await gameDisconnectFunc();
  };

  return (
    //TODO: compartimentalize this JSX into Components
    <div>
      {isAuth ? (
        <Fragment>
          <header className="App-header">
            <div className="btn-wrapper">
              <div>
                {/* <Button TODO: ADD THIS BACK AS A PROFILE BUTTON WITH PLAYER STATS
                  type={BUTTON_TYPES.PRIMARY}
                  onClick={() => {}}
                  text={STRINGS.HOME}
                ></Button> */}
              </div>
              <div>
                {gameActive && (
                  <Button
                    type={BUTTON_TYPES.PRIMARY}
                    onClick={leaveGame}
                    text={STRINGS.RESET}
                  ></Button>
                )}
                <Button
                  type={BUTTON_TYPES.PRIMARY}
                  onClick={logOut}
                  text={STRINGS.LOGOUT}
                ></Button>
              </div>
            </div>
            {popUpOpen && (
              <PopUp
                WRONG_TURN={isWrongTurn}
                ILLEGAL_MOVE={isIllegalMove}
                IN_CHECK={whoInCheck}
                GAME_WON={gameWon}
                GAME_LOST={gameLost}
                leaveGame={leaveGame}
                closePopUp={closePopUp}
              />
            )}
          </header>
          <div className="App-body">
            <h1>{STRINGS.TITLE}</h1>
            <div>
              <Chat client={client}>
                <JoinGame
                  showPopUp={showPopUp}
                  closePopUp={closePopUp}
                  leaveGame={leaveGame}
                  gameActive={gameActive}
                  setGameActive={setGameActive}
                />
              </Chat>
            </div>
          </div>
          <footer className="App-footer">
            <div>
              <p>
                Developed by{" "}
                <a
                  className="App-footer-links"
                  href="https://linkedin.com/in/ryan-watson-4a8690213"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ryan Watson
                </a>
              </p>
              <a
                href="https://linkedin.com/in/ryan-watson-4a8690213"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="App-footer-image"
                  src={LinkedInLogo}
                  alt="LinkedIn Logo"
                />
              </a>
            </div>
            <div>
              <p>
                Chess Board Piece Images from{" "}
                <a
                  className="App-footer-links"
                  href="https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikimedia Commons
                </a>
              </p>
            </div>
          </footer>
        </Fragment>
      ) : (
        <Fragment>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
