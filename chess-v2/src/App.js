import React, { Fragment, useContext, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from 'stream-chat-react';
import Cookies from "universal-cookie";
import ChessBoard from "./ChessBoard.js";
import JoinGame from "./JoinGame.js";
import UserContext from "./store/user-context.js";
import Button from "./uiComponents/Button.js";
import { BUTTON_TYPES, STRINGS } from "./data/stringEnums.js";
import "./App.css";
import SignUp from "./SignUp.js";
import Login from "./Login.js";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const ctx = useContext(UserContext);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("userName");
    client.disconnectUser();
    setIsAuth(false);
  };

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

  return ( //TODO: compartimentalize this JSX into Components
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
          </header>
          <div className="App-body">
            <div>
              <Chat client={ client }>
                {/* <ChessBoard /> */}
                <JoinGame />
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
