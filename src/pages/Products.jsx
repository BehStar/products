import { useState, useEffect } from "react";

import ProductsPage from "../componens/templates/ProductsPage.jsx";

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${isVisible ? "slide-enter-active" : "slide-exit-active"}`}
    >
      <ProductsPage />
    </div>
  );
};

export default Products;
