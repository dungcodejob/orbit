import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes';

export const routes = rootRoute('root.tsx', [
  layout('(authenticated)', './features/shell/screens/Layout.tsx', [
    route('/about', './about.tsx'),
  ]),
  index('./sindex.tsx'),
]);
