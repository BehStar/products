import api from "../utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetProducts = ({ query }) => {
  const queryFn = async () => {
    try {
      const response = await api.get(
        `/products?page=${query.page}&limit=${query.limit}&name=${query.name}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
      );
      return response;
    } catch (error) {
      throw error; 
    }
  };

  const queryKey = [
    "products",
    query.page,
    query.limit,
    query.name,
    query.minPrice,
    query.maxPrice,
  ];

  const { isLoading, data, error,isFetching } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    placeholderData: keepPreviousData,
  });
  return { isLoading, data, error,isFetching };
};

export const useGetNamesMinMaxPrice = () => {
  const queryFn = async () => {
    try {
      const response = await api.get(
        `/products?limit=${Number.MAX_SAFE_INTEGER}`
      );
      const prices = response.data.map((Product) => Product.price);
      const names = response.data.map((Product) => ({
        id: Product.id,
        name: Product.name,
      }));
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return { min, max, names };
    } catch (error) {
      console.error("Error fetching min/max price:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["namesMinMaxPrice"],
    queryFn: queryFn,
  });
};

export const useGetProduct = (productId) => {





  const queryFn = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, data, error,isFetching }= useQuery({
    queryKey: ["products", productId],
    queryFn: queryFn,
    placeholderData: keepPreviousData,
  });
  return { isLoading, data, error,isFetching };
};
