import { useState, useEffect } from "react";

import ProductPage from "../componens/templates/ProductPage.jsx";

const Product = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${isVisible ? "slide-enter-active" : "slide-exit-active"}`}
    >
      <ProductPage />
    </div>
  );
};

export default Product;
