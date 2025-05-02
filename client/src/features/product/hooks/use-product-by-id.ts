import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.api";
import { QUERY_KEYS } from "@/constants/query";

export function useProductById(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS, id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });
}