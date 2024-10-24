import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

import { FaUserSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

import { useAuth } from "../../providers-contexts/AuthContext.jsx";
import { useModal } from "../../providers-contexts/ModalContext.jsx";

import styles from "./Header.module.css";

const Header = () => {
  const { toggleAccount } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toggleModal } = useModal();

  let haveToken = Cookies.get("token") ? true : false;

  useEffect(() => {
    setIsLoggedIn(haveToken);
  }, [haveToken]);

  const handleLogout = () => {
    toggleModal(
      true,
      "آیا برای خروج از حساب کاربری اطمینان دارید؟",
      <FaUserSlash />,
      exitFunc
    );
  };
  const exitFunc = () => {
    toggleAccount(false, "", "");
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div className={styles.accountPart}>
        <FaRegUser />

        {isLoggedIn ? (
          <button onClick={handleLogout}>خروج</button>
        ) : (
          <>
            <NavLink to="/login">ورود</NavLink>
            <span> | </span>
            <NavLink to="/register">ثبت نام</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
