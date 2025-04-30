import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/header';
import { useAuthStore } from '@/features/auth/stores';

export const Route = createFileRoute('/_(authenticated)')({
  component: Layout,
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      // Redirect to login with redirect param
      throw  redirect({
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

export function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SiteHeader />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
