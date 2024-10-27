import { useState, createContext, useContext } from "react";

export const ModalFormProductContext = createContext();

export const ModalProductFormProvider = ({ children }) => {
  const [modalProductForm, setModalProductForm] = useState({
    isVisible: false,
    isCreate: true,
    name: "",
    quantity: "",
    price: "",
  });

  const toggleModalProductForm = (
    isVisible,
    isCreate,
    id,
    name,
    quantity,
    price
  ) => {
    setModalProductForm({ isVisible, isCreate, id, name, quantity, price });
  };

  return (
    <ModalFormProductContext.Provider
      value={{ modalProductForm, toggleModalProductForm }}
    >
      {children}
    </ModalFormProductContext.Provider>
  );
};

export const useModalProdcutForm = () => {
  const { modalProductForm, toggleModalProductForm } = useContext(
    ModalFormProductContext
  );
  return { modalProductForm, toggleModalProductForm };
};
