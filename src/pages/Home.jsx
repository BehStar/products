import HomePage from "../componens/templates/HomePage";

import { useState, useEffect } from "react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${isVisible ? "slide-enter-active" : "slide-exit-active"}`}
    >
      <HomePage />
    </div>
  );
};

export default Login;
