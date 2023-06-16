import React, { Fragment, useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChessBoard from "./ChessBoard.js";
import JoinGame from "./JoinGame.js";
import UserContext from "./store/user-context.js";
import Button from "./uiComponents/Button.js";
import { BUTTON_TYPES, STRINGS } from "./data/stringEnums.js";
import "./App.css";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import PopUp from "./uiComponents/PopUp.js";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const ctx = useContext(UserContext);
  const [popUpOpen, setPopUpOpen] = useState(false);
  let isWrongTurn = false;
  let isIllegalMove = false;

  useEffect(() => {
    if (token) {
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
  }, []);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  /*
   * 0 = Player tried to move when it wasn't their turn
   * 1 = Player tried to perform a move that is illegal
   */
  const showPopUp = (popUpCode) => {
    switch(popUpCode) {
      case 0:
        isWrongTurn = true;
        setPopUpOpen(true);
        break;
      case 1:
        isIllegalMove = true;
        setPopUpOpen(true);
        break;
      default: 
        console.log("something went wrong");
    }
  };

  const closePopUp = () => {
    isWrongTurn = false;
    isIllegalMove = false;
    setPopUpOpen(false);
  }

  return (
    //TODO: compartimentalize this JSX into Components
    <div>
      {isAuth ? (
        <Fragment>
          <header className="App-header">
            <div className="btn-wrapper">
              <Button
                type={BUTTON_TYPES.PRIMARY}
                onClick={() => {}}
                text={STRINGS.START}
              ></Button>
              <div>{STRINGS.TITLE}</div>
              <Button
                type={BUTTON_TYPES.PRIMARY}
                onClick={() => {}}
                text={STRINGS.RESET}
              ></Button>
              <Button
                type={BUTTON_TYPES.PRIMARY}
                onClick={logOut}
                text={STRINGS.LOGOUT}
              ></Button>
            </div>
            {popUpOpen && <PopUp
              WRONG_TURN={isWrongTurn}
              ILLEGAL_MOVE={isIllegalMove}
              closePopUp={closePopUp}
            />}
          </header>
          <div className="App-body">
            <div>
              <Chat client={client}>
                {/* <ChessBoard /> */}
                <JoinGame showPopUp={showPopUp} closePopUp={closePopUp} />
              </Chat>
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
