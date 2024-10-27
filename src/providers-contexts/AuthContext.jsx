import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn,setLoggedIn] = useState({
    isLoggedIn: false,
    token: "",
    username: "",
  });

  const toggleAccount = (isLoggedIn, token, username) => {
    if (isLoggedIn) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("username", username, { expires: 7 });
    } else {
      Cookies.remove("token");
      Cookies.remove("username");
    }
    setLoggedIn(isLoggedIn, token, username);
  };
  const getIsLoggedAccount = () => {
    const token = Cookies.get("token");
    const username = Cookies.get("username");
    const isLoggedIn = token && username ? true : false;
    return { isLoggedIn, token, username };
  };

  return (
    <AuthContext.Provider value={{ toggleAccount,getIsLoggedAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { toggleAccount, loggedIn, getIsLoggedAccount } =
    useContext(AuthContext);
  return { toggleAccount, loggedIn, getIsLoggedAccount };
};
