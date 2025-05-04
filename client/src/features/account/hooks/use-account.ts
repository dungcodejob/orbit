import { useQuery } from '@tanstack/react-query';
import { useAccountStore } from '../stores';
import { useAuthStore } from '@/features/auth/stores';
import { WEEK } from '@/constants/default-values';
import { QUERY_KEYS } from '@/constants/query';

export const useAccount = () => {
  const { getAccount } = useAccountStore();
  const { isAuthenticated } = useAuthStore();
  const query = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT, QUERY_KEYS.ME],
    queryFn: getAccount,
    gcTime: WEEK,
    enabled: isAuthenticated,
  });

  return query;
};
