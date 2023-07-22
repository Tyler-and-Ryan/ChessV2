import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import Button from "./uiComponents/Button.js";
import "./Login.css";
import { BUTTON_TYPES } from "./data/stringEnums.js";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogIn, setShowLogIn] = useState(false);

  const cookies = new Cookies();
  const login = () => {
    Axios.post("https://checkmate-the-king.onrender.com/login", { username, password })
      .then((res) => {
        console.log("res: " + res);
        const { token, userId, firstName, lastName, username } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("username", username);
        props.setIsAuth(true);
      })
      .catch((error) => {
        console.log("Login Error: " + error);
      });
  };

  const handleLogInOptions = () => {
    setShowLogIn((prevShowLogIn) => {
      return !prevShowLogIn;
    });
  };

  return (
    <div className="logInContainer">
      <div className="loginLabelContainer">
        <label className="loginLabel" onClick={handleLogInOptions}>Log In</label>
      </div>
      {showLogIn && (
        <div className="loginForm">
          <input
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button onClick={login} text="Submit" type={BUTTON_TYPES.TERTIARY}/>
        </div>
      )}
    </div>
  );
};

export default Login;
