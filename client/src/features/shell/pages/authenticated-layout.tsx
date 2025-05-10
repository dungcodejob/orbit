import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAccount } from '@/features/account/hooks/use-account';
import { useAccountStore } from '@/features/account/stores';
import { useAuthStore } from '@/features/auth/stores';
import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/header';
import SubSidebarMenu from '../components/sub-sidebar-menu';
import { useTranslation } from 'react-i18next';
import {
  RiUser6Line,
  RiStore2Line,
  RiShieldUserLine,
  RiUserAddLine,
  RiTimeLine,
  RiMailLine,
  RiPriceTag3Line,
  RiBankCardLine,
  RiPercentLine,
  RiRouteLine,
  RiPrinterLine,
  RiTruckLine,
  RiScales2Line,
  RiDiscountPercentLine,
  RiCoupon2Line,
  RiIdCardLine,
  RiCoinsLine,
  RiGiftLine,
  RiGridFill,
  RiRefreshLine,
  RiNodeTree,
  RiHistoryLine,
  RiSmartphoneLine,
  RiWebhookLine,
  RiLinksLine,
  RiBarChartBoxLine,
  RiDatabase2Line,
  RiEqualizerLine,
  RiSettings2Line,
  RiShoppingBag2Line,
} from '@remixicon/react';
import { Bot, BookOpen, Settings2 } from 'lucide-react';
import { MenuItem } from '../components/nav-group';

const findCurrentMenuItem = (
  menuItems: MenuItem[],
  pathname: string,
): MenuItem | null => {
  for (const item of menuItems) {
    if (item.children) {
      const found = findCurrentMenuItem(item.children, pathname);
      if (found) {
        return found;
      }
    }
    if (item.url && pathname.startsWith(item.url)) {
      return item;
    }
  }
  return null;
};

export type MenuGroup = {
  title: string;
  url?: string;
  items: MenuItem[];
};

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
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const groups: MenuGroup[] = useMemo(
    () => [
      {
        title: t('sidebar.main'),
        items: [
          {
            title: t('product.products'),
            icon: RiShoppingBag2Line,
            isActive: true,
            children: [
              {
                title: t('product.products_list'),
                icon: RiShoppingBag2Line,
                url: '/products',
                shortcut: 'p',
              },
              {
                title: t('product.product_categories'),
                icon: RiDatabase2Line,
                url: '/products/categories',
              },
              {
                title: t('product.product_toppings'),
                icon: RiEqualizerLine,
                url: '/products/toppings',
              },
              {
                title: t('product.date_weekly_menu'),
                icon: RiBarChartBoxLine,
                url: '/daily-menus',
              },
            ],
          },
          {
            title: 'Models',
            url: '#',
            icon: Bot,
            children: [
              {
                title: 'Genesis',
                url: '#',
              },
              {
                title: 'Explorer',
                url: '#',
              },
              {
                title: 'Quantum',
                url: '#',
              },
            ],
          },
          {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            children: [
              {
                title: 'Introduction',
                url: '#',
              },
              {
                title: 'Get Started',
                url: '#',
              },
              {
                title: 'Tutorials',
                url: '#',
              },
              {
                title: 'Changelog',
                url: '#',
              },
            ],
          },
          {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            children: [
              {
                title: 'General',
                url: '#',
              },
              {
                title: 'Team',
                url: '#',
              },
              {
                title: 'Billing',
                url: '#',
              },
              {
                title: 'Limits',
                url: '#',
              },
            ],
          },
        ],
      },
      {
        title: t('sidebar.other'),
        items: [
          {
            title: t('setting.integration'),
            icon: RiEqualizerLine,
            url: '/integrations',
          },
          {
            title: t('setting.establish'),
            icon: RiSettings2Line,
            url: '/settings',
            groups: [
              {
                title: t('setting.general'),
                items: [
                  {
                    title: t('setting.profile_settings'),
                    url: '/settings/account/profile',
                    icon: RiUser6Line,
                  },
                  {
                    title: t('setting.store_setting'),
                    url: '/settings/shop',
                    icon: RiStore2Line,
                    permissionKey: 'basic_information',
                  },
                  {
                    title: t('setting.set_up_roles'),
                    icon: RiShieldUserLine,
                    url: '/settings/roles',
                    permissionKey: 'view_user_role_list',
                  },
                  {
                    title: t('setting.add_role'),
                    icon: RiUserAddLine,
                    url: '/settings/roles/create',
                    permissionKey: 'add_edit_user_role',
                    isHidden: true,
                  },
                  {
                    title: t('setting.store_working_hours'),
                    url: '/settings/shop-working-hour',
                    icon: RiTimeLine,
                    permissionKey: 'view_working_hours_list',
                  },
                  {
                    title: t('setting.sms_zns_management'),
                    url: '/settings/sms-email',
                    icon: RiMailLine,
                    permissionKey: 'view_transaction_history',
                  },
                ],
              },
              {
                title: t('setting.sale'),
                items: [
                  // {
                  //     title: t('setting.price_list'),
                  //     icon: RiQuestionMark,
                  //     url: '/settings/v1/commission',
                  // },
                  {
                    title: t('setting.price_list'),
                    icon: RiPriceTag3Line,
                    url: '/settings/price-lists',
                    permissionKey: 'pricing_policy',
                  },
                  {
                    title: t('setting.payment_methods'),
                    icon: RiBankCardLine,
                    url: '/settings/payment-methods',
                    permissionKey: 'view_cash_fund_list',
                  },
                  {
                    title: t('setting.tax_settings'),
                    url: '/settings/tax',
                    icon: RiPercentLine,
                    permissionKey: 'tax_setup',
                  },
                  {
                    title: t('setting.order_status'),
                    url: '/settings/order-status',
                    icon: RiRouteLine,
                    permissionKey: 'order_status',
                  },
                  {
                    title: t('setting.set_up_print_templates'),
                    url: '/settings/print-template',
                    icon: RiPrinterLine,
                    permissionKey: 'print_template_setup',
                  },
                  {
                    title: t('setting.shipping_configuration'),
                    url: '/settings/shipping',
                    icon: RiTruckLine,
                    permissionKey: 'shipping_configuration',
                  },
                  {
                    title: t('setting.electronic_scales'),
                    icon: RiScales2Line,
                    url: '/settings/electronic-scales',
                    permissionKey: 'electronic_scale',
                  },
                ],
              },
              {
                title: t('setting.loyalty'),
                items: [
                  {
                    title: t('setting.promotions'),
                    url: '/settings/marketing',
                    icon: RiDiscountPercentLine,
                  },
                  {
                    title: t('setting.vouchers'),
                    url: '/settings/vouchers',
                    icon: RiCoupon2Line,
                  },
                  {
                    title: t('setting.membership_tiers'),
                    url: '/settings/membership-terms',
                    icon: RiIdCardLine,
                  },
                  {
                    title: t('setting.point_accumulation'),
                    url: '/settings/accumulate-points',
                    icon: RiCoinsLine,
                  },
                  {
                    title: t('setting.gift_exchange'),
                    url: '/settings/exchange-gifts',
                    icon: RiGiftLine,
                  },
                ],
              },
              {
                title: t('setting.other'),
                items: [
                  {
                    title: t('setting.table_settings'),
                    url: '/settings/table',
                    icon: RiGridFill,
                  },
                  {
                    title: t('setting.data_sync_request'),
                    url: '/settings/request-data-sync',
                    icon: RiRefreshLine,
                  },
                ],
              },
              {
                title: t('setting.advanced_settings'),
                items: [
                  {
                    title: t('setting.branch_groups'),
                    url: '/settings/branch-groups',
                    icon: RiNodeTree,
                  },
                  {
                    title: t('setting.branch_list'),
                    url: '/settings/branches',
                    icon: RiStore2Line,
                  },
                  {
                    title: t('setting.operation_history'),
                    url: '/settings/activities',
                    icon: RiHistoryLine,
                  },
                  {
                    title: t('setting.device_management'),
                    url: '/settings/devices',
                    icon: RiSmartphoneLine,
                  },
                  {
                    title: t('setting.webhooks'),
                    url: '/settings/webhooks',
                    icon: RiWebhookLine,
                    permissionKey: 'basic_information',
                  },
                  {
                    title: t('setting.add_webhook'),
                    url: '/settings/webhooks/crete',
                    permissionKey: 'basic_information',
                    isHidden: true,
                  },
                  {
                    title: t('setting.api_keys'),
                    url: '/settings/api-keys',
                    icon: RiLinksLine,
                    permissionKey: 'basic_information',
                  },
                  {
                    title: t('setting.add_api_key'),
                    url: '/settings/api-keys/create',
                    permissionKey: 'basic_information',
                    isHidden: true,
                  },
                ],
              },
            ],
            isHideChildren: true,
            isShowSubSidebar: true,
          },
        ],
      },
    ],
    [t],
  );

  const activeItem = useMemo(() => {
    const current = findCurrentMenuItem(
      groups.map((item) => ({
        title: item.title,
        url: item.url,
        children: item.items,
      })),
      pathname,
    );
    if (!current || current.children?.length) {
      return null;
    }

    return current;
  }, [groups, pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full">
          {activeItem?.groups ? (
            <SubSidebarMenu
              title={activeItem.title}
              groups={activeItem.groups}
            />
          ) : (
            <div className="w-0" />
          )}

          <div className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <SiteHeader />
            </header>

            <div className="relative z-50 mx-auto flex w-full max-w-[1360px] flex-1 flex-col self-stretch">
              <Outlet />
            </div>
          </div>
        </div>

        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SiteHeader />
        </header>
        <div className="relative z-50 mx-auto flex w-full max-w-[1360px] flex-1 flex-col self-stretch">
          <Outlet />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
