import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../componens/layout/Layout.jsx";
import Home from "../pages/home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Alert from "../componens/modules/Alert.jsx";
import Modal from "../componens/modules/Modal.jsx";

import { useAlert } from "../providers-contexts/AlertContext.jsx";
import { useModal } from "../providers-contexts/ModalContext.jsx";


const RoutesWebsite = () => {
  const { alert } = useAlert();
  const { modal } = useModal();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {alert.isVisible && <Alert />}
        {modal.isVisible && <Modal />}
      </Layout>
    </BrowserRouter>
  );
};

export default RoutesWebsite;
