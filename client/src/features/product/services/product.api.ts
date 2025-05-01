import { apiClient } from "@/api/api.client";
import { Product } from "../types/product";

export const productApi = {
  getProducts: () => apiClient.get<Product[]>('/api/products'),
  getProductById
  
  
  : (id: string) => apiClient.get<Product>(`/api/products/${id}`),
  updateProduct: (id: string, data: Partial<Product>) =>
    apiClient.put<Product>(`/api/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/api/products/${id}`),
};
