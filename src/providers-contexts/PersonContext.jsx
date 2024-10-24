import { useState, createContext, useContext } from "react";

export const PersonContext = createContext();

export const PersonAccountProvider = ({ children }) => {
  const [pesronAccount, setPersonAccount] = useState({username:'',password:''});
  return (
    <PersonContext.Provider value={{ pesronAccount, setPersonAccount}}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePersonAccount = () => {
  const { pesronAccount, setPersonAccount} = useContext(PersonContext);
  return { pesronAccount, setPersonAccount};
};
