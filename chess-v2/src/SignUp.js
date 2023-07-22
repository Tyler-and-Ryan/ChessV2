import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./SignUp.css";

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
      <label onClick={handleSignInOptions}>Sign Up</label>
      {showSignIn && (
        <div>
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
          <button onClick={signUp}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
