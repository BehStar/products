import { createContext, useState,useContext } from "react";

const ShowRemoveContext = createContext();

export const ShowRemoveProvider = ({ children }) => {
  const [isShowRemove, setIsShowRemove] = useState(false);

  return (
    <ShowRemoveContext.Provider value={{ isShowRemove, setIsShowRemove }}>
      {children}
    </ShowRemoveContext.Provider>
  );
};


export const useShowRemove = () => {
  const { isShowRemove, setIsShowRemove } = useContext(ShowRemoveContext);
  return { isShowRemove, setIsShowRemove };
};
