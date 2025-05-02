import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../services/product.api";
import { Product } from "../types/product";
import { QUERY_KEYS } from "@/constants/query";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] });
    },
  });
}