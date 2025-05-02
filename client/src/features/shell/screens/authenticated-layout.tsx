import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useEffect, type PropsWithChildren } from 'react';

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/header';
import { useAuthStore } from '@/features/auth/stores';
import { useAccount } from '@/features/account/hooks/use-account';
import { useAccountStore } from '@/features/account/stores';

export const Route = createFileRoute('/_(authenticated)')({
  component: AuthenticatedLayout,
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      // Redirect to login with redirect param
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
        replace: true,
      });
      // Returning false prevents the route from loading
      return false;
    }
    // Allow route to load
    return true;
  },
});

export function AuthenticatedLayout() {
  const { data } = useAccount();
  const {account} = useAccountStore();
  useEffect(() => {
    console.log(account);
  }, [account])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SiteHeader />
        </header>
        <div className="relative z-50 mx-auto flex w-full max-w-[1360px] flex-1 flex-col self-stretch">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
