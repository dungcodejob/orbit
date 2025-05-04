import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import { productApi } from '../services/product.api';
import { QUERY_KEYS } from '@/constants/query';

const productQueryOptions = () =>
  queryOptions({
    queryKey: [QUERY_KEYS.PRODUCT],
    queryFn: () => productApi.getProducts().then((res) => res.data),
    placeholderData: keepPreviousData,
  });

export function useProducts() {
  return useQuery(productQueryOptions());
}
