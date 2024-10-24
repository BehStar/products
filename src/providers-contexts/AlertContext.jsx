import { useState, createContext, useContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isVisible: false,
    header: "",
    message: "",
  });

  const toggleAlert = (isVisible, message, header) => {
    setAlert({ isVisible, message, header });
  };
  return (
    <AlertContext.Provider value={{ alert, toggleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const { alert, toggleAlert } = useContext(AlertContext);
  return { alert, toggleAlert };
};
