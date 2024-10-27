import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../componens/layout/Layout.jsx";
import Home from "../pages/home.jsx";
import Products from "../pages/products.jsx";
import Product from "../pages/Product.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Alert from "../componens/modules/Alert.jsx";
import Modal from "../componens/modules/Modal.jsx";
import ModalProductForm from "../componens/modules/ModalProductForm.jsx";


import { useAlert } from "../providers-contexts/AlertContext.jsx";
import { useModal } from "../providers-contexts/ModalContext.jsx";
import { useModalProdcutForm } from "../providers-contexts/ModalFormProdcut.jsx";

const RoutesWebsite = () => {
  const { alert } = useAlert();
  const { modal } = useModal();
  const { modalProductForm } = useModalProdcutForm();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {alert.isVisible && <Alert />}
        {modal.isVisible && <Modal />}
        {modalProductForm.isVisible && <ModalProductForm />}
      </Layout>
    </BrowserRouter>
  );
};

export default RoutesWebsite;
