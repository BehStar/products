import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]); 
};

export default useRedirectIfLoggedIn;
