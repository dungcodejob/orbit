import { create } from "zustand";
import { LoginCredentials } from "../types/login-credentials";

type AuthState = {
    isAuthenticated: false;
    token: null;
} | {
    isAuthenticated: true;
    token: {
        access: string;
        refresh: string;
    }
}

type AuthMethod = {
    login: (data: LoginCredentials) => void;
    logout: () => void;
}
type AuthStore = AuthState & AuthMethod;

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    token: null,
    login: (data) => set({ isAuthenticated: true,  }),
    logout: () => set({ isAuthenticated: false, user: null, token: null }),
  }));