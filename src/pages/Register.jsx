import { useState, useEffect } from "react";

import useRedirectIfLoggedIn from "../configs/useRedirectIfLoggedIn";

import RegisterPage from "../componens/templates/RegisterPage";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  useRedirectIfLoggedIn();
  return (
    <div
      className={`${isVisible ? "slide-enter-active" : "slide-exit-active"}`}
    >
      <RegisterPage />
    </div>
  );
};

export default Register;
