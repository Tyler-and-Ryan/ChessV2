import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import Button from "./uiComponents/Button.js";
import "./SignUp.css";
import { BUTTON_TYPES } from "./data/stringEnums";

const SignUp = (props) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      props.setIsAuth(true);
    });
  };

  const handleSignInOptions = () => {
    setShowSignIn((prevShowSignIn) => {
      return !prevShowSignIn;
    });
  };

  return (
    <div className="signUpContainer">
      <div className="signUpLabelContainer">
        <label className="signUpLabel" onClick={handleSignInOptions}>Sign Up</label>
      </div>
      {showSignIn && (
        <div className="signUpForm">
          <input
            placeholder="First Name"
            onChange={(event) => {
              setUser({ ...user, firstName: event.target.value });
            }}
          />
          <input
            placeholder="Last Name"
            onChange={(event) => {
              setUser({ ...user, lastName: event.target.value });
            }}
          />
          <input
            placeholder="Username"
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
          <Button onClick={signUp} type={BUTTON_TYPES.TERTIARY} text="Sign Up" />
        </div>
      )}
    </div>
  );
};

export default SignUp;
