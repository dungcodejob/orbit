import env from '@/env';
import { useAuthStore } from '@/features/auth/stores';
import axios from 'axios';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  baseURL: `${env.PUBLIC_API_URL}/api/`,
});


apiClient.interceptors.request.use(
  async (config) => {
    const { isAuthenticated, token } = useAuthStore();

    const controller = new AbortController();
    if (!isAuthenticated || config.url?.includes('/system/v2/login')) {
      return config;
    }

    if (token.access) {
      config.headers.Authorization = `Bearer ${token.access}`;
      return config;
    }

    controller.abort();
    return {
      ...config,
      signal: controller.signal,
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

