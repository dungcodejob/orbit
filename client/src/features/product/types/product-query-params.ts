import { BackendPagination } from '@/types';
import { BackendSort } from '@/types';

export type ProductQueryParams = BackendPagination &
  BackendSort & {
    keyword?: string;
  };
