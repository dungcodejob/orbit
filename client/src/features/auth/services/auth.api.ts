import { AuthResult, LoginCredentials } from '../types';
import { apiClient } from '@/api/api.client';

export const authApi = {
  login: (data: LoginCredentials) =>
    apiClient.post<AuthResult>('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
};
