import api from "../utils/api";
import { useMutation } from "@tanstack/react-query";

// Register
export const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);
  return useMutation({ mutationFn });
};

// Login
export const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);
  return useMutation({ mutationFn });
};

// Delete ONE Product
export const useDeleteProduct = (id) => {
  const mutationFn = () => api.delete(`products/${id}`);
  return useMutation({
    mutationFn,
    queryKey: ["products"],
  });
};

// Remove Some Products
export const useRemoveProducts = () => {
  const mutationFn = async(data) => {
    try {
      const response =api.delete(`products`, data);
      return response;
    } catch (error) {
      console.log(error);
      throw error; 
    }
    
  };
  return useMutation({
    mutationFn,
    queryKey: ["products"],
  });
};

// Create Product
export const useCreateProduct = () => {
  const mutationFn = (data) => api.post(`products`, data);
  return useMutation({
    mutationFn,
  });
};

// Edit Product
export const useEditProduct = (id) => {
  const mutationFn = (data) => api.put(`products/${id}`, data);
  return useMutation({
    mutationFn,
    queryKey: ["products", id],
  });
};
