import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes';

export const routes = rootRoute('root.tsx', [
  layout('(authenticated)', './features/shell/screens/authenticated-layout.tsx', [
    index('./features/home/pages/home.tsx'),
    route('/product', './features/products/pages/product-page.tsx'),
  ]),
  layout('(unauthenticated)', './features/shell/screens/unauthenticated-layout.tsx', [
    route('/login', './features/auth/pages/login-page.tsx'),
  ]),

]);
