import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState({ isLoggedIn: false, username: "" });

  const toggleAccount = () => {
    const token = Cookies.get("token");
    const username = Cookies.get("username");
    if (token && username) {
      setLoggedIn({ isLoggedIn: true, username });
    }
  };

  return (
    <AuthContext.Provider value={{ toggleAccount, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { toggleAccount, loggedIn } = useContext(AuthContext);
  return { toggleAccount, loggedIn };
};
