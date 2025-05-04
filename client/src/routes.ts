import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes';

export const routes = rootRoute('root.tsx', [
  layout(
    '(authenticated)',
    './features/shell/screens/authenticated-layout.tsx',
    [
      index('./features/home/pages/home.tsx'),
      route('/product', './features/product/pages/product-page.tsx'),
      route(
        '/product/$productId',
        './features/product/pages/update-product-page.tsx',
      ),
    ],
  ),
  layout(
    '(unauthenticated)',
    './features/shell/screens/unauthenticated-layout.tsx',
    [route('/login', './features/auth/pages/login-page.tsx')],
  ),
]);
