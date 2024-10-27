import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useGetProducts,
  useGetNamesMinMaxPrice,
} from "../../configs/queries.js";
import { useAuth } from "../../providers-contexts/AuthContext.jsx";

import HeaderProducts from "../modules/HeaderProducts.jsx";
import ManagerProducts from "../modules/ManagerProducts.jsx";
import TableProducts from "../modules/TableProducts.jsx";
import Pagination from "../modules/Pagination.jsx";
import Loading from "../modules/Loading.jsx";

const ProductsPage = () => {
  const { getIsLoggedAccount } = useAuth();
  const isLoggedIn = getIsLoggedAccount().isLoggedIn;
  const { data: minMaxData } = useGetNamesMinMaxPrice();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const name = searchParams.get("name") || "";
    const minPrice = parseInt(searchParams.get("minPrice")) || 1;
    const maxPrice = parseInt(searchParams.get("maxPrice"));
    return { page, limit, name, minPrice, maxPrice };
  });
  const [errorMessageProducts, setErrorMessageProducts] = useState(null);

  useEffect(() => {
    if (minMaxData) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        maxPrice: prevQuery.maxPrice || minMaxData.max,
      }));
    }
  }, [minMaxData]);

  useEffect(() => {
    const newQuery = { ...query };

    if (newQuery.page === 1) {
      delete newQuery.page;
    }
    if (newQuery.limit === 10) {
      delete newQuery.limit;
    }
    if (newQuery.name === "") {
      delete newQuery.name;
    }
    if (newQuery.minPrice === 1) {
      delete newQuery.minPrice;
    }
    if (
      newQuery.maxPrice === Number.MAX_SAFE_INTEGER ||
      newQuery.maxPrice === minMaxData?.max
    ) {
      delete newQuery.maxPrice;
    }

    setSearchParams(newQuery);
  }, [query]);

  const { data,isFetching, error } = useGetProducts({ query });

  useEffect(() => {
    const handleError = (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessageProducts(
              "محصولی یافت نشد. لطفا پارامترهای جستجو را بررسی کنید."
            );
            break;
          case 404:
            setErrorMessageProducts("محصولات یافت نشد.");
            break;
          case 500:
            setErrorMessageProducts("خطای داخلی سرور. لطفا بعدا دوباره امتحان کنید.");
            break;
          default:
            setErrorMessageProducts("خطایی در هنگام دریافت محصولات رخ داده است.");
        }
      } else if (error.request) {
        setErrorMessageProducts("خطای شبکه: اتصال به سرور برقرار نشد.");
      } else {
        setErrorMessageProducts("خطای غیرمنتظره‌ای رخ داده است.");
      }
    };

    if (error) {
      handleError(error);
    } else {
      setErrorMessageProducts(null);
    }
  }, [error]);

  const totalPages = data?.totalPages;
  const products = data?.data;
  let reversedProducts = products ? [...products].reverse() : [];

  return (
    <div>
      <HeaderProducts
        query={query}
        setQuery={setQuery}
        minMaxData={minMaxData}
      />
      {isLoggedIn && <ManagerProducts />}
      {isFetching && <Loading/>}
      <TableProducts products={reversedProducts} errorMessageProducts={errorMessageProducts}/>
      <Pagination
        page={query.page}
        setQuery={setQuery}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProductsPage;
