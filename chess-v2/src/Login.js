import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogIn, setShowLogIn] = useState(false);

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", { username, password })
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
      <div className="loginLabel">
        <label onClick={handleLogInOptions}>Login</label>
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
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
