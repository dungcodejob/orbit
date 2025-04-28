import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const Route = createFileRoute('/_(authenticated)')({
  component: Layout,
});

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-start lg:grid lg:grid-cols-[auto,minmax(0,1fr)]">
        <Sidebar />
        <HeaderMobile />
        <div className="w-full flex-1 self-stretch lg:grid lg:grid-cols-[auto,minmax(0,1fr)]">
          {subMenu ? (
            <SubSidebarMenu
              title={subMenu.label}
              items={subMenu.children || []}
            />
          ) : (
            <div className="w-0" />
          )}
          <div className="relative self-stretch max-h-screen overflow-y-auto">
            <Header
              title={''}
              className="sticky top-0 z-50 hidden lg:block bg-white"
            />
            <div className="main-container flex w-full flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <SearchMenu />
    </>
  );
}
