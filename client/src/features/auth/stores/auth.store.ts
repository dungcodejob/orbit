import { create } from "zustand";
import { LoginCredentials } from "../types/login-credentials";
import { authApi } from "../services";
import { AuthResult } from "../types";

type AuthState = {
    isAuthenticated: false;
    tokens: null;
} | {
    isAuthenticated: true;
    tokens: AuthResult['tokens']
}

type AuthMethod = {
    login: (data: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}
type AuthStore = AuthState & AuthMethod;

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    tokens: null,
    login: (data) => authApi.login(data).then((res) => set({ isAuthenticated: true, tokens: res.data.tokens })),
    logout: () => authApi.logout().then(() => set({ isAuthenticated: false, tokens: null })),
}));
