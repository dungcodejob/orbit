import { apiClient } from "@/api/api.client";
import { Product } from "../types/product";
import { PaginationResult } from "@/types";
import { ProductQueryParams } from "../types";


export const productApi = {
  getProducts: (
    params?: ProductQueryParams,
    signal?: AbortSignal
  ) =>
    apiClient.get<PaginationResult<Product>>('/products', { params, signal }),
  getProductById: (id: string) => apiClient.get<Product>(`/products/${id}`),
  updateProduct: (id: string, data: Partial<Product>) =>
    apiClient.put<Product>(`/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/products/${id}`),
};
