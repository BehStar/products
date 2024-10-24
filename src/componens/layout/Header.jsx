// import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { FaUserSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

import { useAuth } from "../../providers-contexts/AuthContext";

import styles from "./Header.module.css";

const Header = () => {
  const { loggedIn } = useAuth();
  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <header className={styles.header}>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div className={styles.accountPart}>
        <FaRegUser />

        {loggedIn.isLoggedIn ? (
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
