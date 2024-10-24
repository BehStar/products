import { useState, useEffect } from "react";

import LoginPage from "../componens/templates/LoginPage.jsx";
import useRedirectIfLoggedIn from "../configs/useRedirectIfLoggedIn.js";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useRedirectIfLoggedIn();
  return (
    <div
      className={`${isVisible ? "slide-enter-active" : "slide-exit-active"}`}
    >
      <LoginPage />
    </div>
  );
};

export default Login;
