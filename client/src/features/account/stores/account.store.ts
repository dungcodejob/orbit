import { create } from 'zustand';
import { User } from '../types';
import { accountApi } from '../services';

type AccountState = {
  account: User | null;
};

type AccountAction = {
  getAccount: () => Promise<User>;
  clearAccount: () => void;
};

export type AccountStore = AccountState & AccountAction;

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  getAccount: () =>
    accountApi.getAccount().then((res) => {
      set({ account: res.data });
      return res.data;
    }),
  clearAccount: () => set({ account: null }),
}));
