import React, { useState } from "react";

const UserContext = React.createContext({
  playerColor: "White",
  swapPlayerColor: () => {},
});

export const UserContextProvider = (props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  // useEffect(() => {
  //   const storedLogInInformation = localStorage.getItem("isLoggedIn");
  //   if (storedLogInInformation === "1") {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  // const loginHandler = () => {
  //   localStorage.setItem("isLoggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // return (
  //   <AuthContext.Provider
  //     value={{
  //       isLoggedIn: isLoggedIn,
  //       onLogout: logoutHandler,
  //       onLogin: loginHandler,
  //     }}
  //   >
  //     {props.children}
  //   </AuthContext.Provider>
  // );


    const [playerColor, setPlayerColor] = useState("White");

    const swapPlayerColor = () => {
        if (playerColor === "White") {
            setPlayerColor("Black");
        } else {
            setPlayerColor("White");
        }
    }

  return (
    <UserContext.Provider
      value={{
        playerColor: playerColor,
        swapPlayerColor: swapPlayerColor,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
