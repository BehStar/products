import { useState, createContext, useContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isVisible: false,
    header: "",
    message: "",
    onConfirm: null,
  });

  const toggleModal = (isVisible, message, header, onConfirm) => {
    setModal({
      isVisible,
      message,
      header,
      onConfirm,
    });
  };

  return (
    <ModalContext.Provider value={{ modal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { modal, toggleModal } = useContext(ModalContext);
  return { modal, toggleModal };
};
