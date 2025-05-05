import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  RiBankCardLine,
  RiBarChartBoxLine,
  RiCoinsLine,
  RiCoupon2Line,
  RiDatabase2Line,
  RiDiscountPercentLine,
  RiEqualizerLine,
  RiGiftLine,
  RiGridFill,
  RiHistoryLine,
  RiIdCardLine,
  RiLinksLine,
  RiMailLine,
  RiNodeTree,
  RiPercentLine,
  RiPriceTag3Line,
  RiPrinterLine,
  RiRefreshLine,
  RiRouteLine,
  RiScales2Line,
  RiSettings2Line,
  RiShieldUserLine,
  RiShoppingBag2Line,
  RiSmartphoneLine,
  RiStore2Line,
  RiTimeLine,
  RiTruckLine,
  RiUser6Line,
  RiUserAddLine,
  RiWebhookLine,
} from '@remixicon/react';
import { useLocation } from '@tanstack/react-router';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavItem, NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { pathname } = useLocation();


  const navMain: NavItem[] = [
    {
      title: t('product.products'),
      icon: RiShoppingBag2Line,
      isActive: true,
      items: [
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
      items: [
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
      items: [
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
      items: [
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
  ];
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],

    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };

  const navOthers: NavItem[] = [
    {
      title: t('setting.integration'),
      icon: RiEqualizerLine,
      url: '/integrations',
    },
    {
      title: t('setting.establish'),
      icon: RiSettings2Line,
      url: '/settings',
      items: [
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
              permission_key: 'basic_information',
            },
            {
              title: t('setting.set_up_roles'),
              icon: RiShieldUserLine,
              url: '/settings/roles',
              permission_key: 'view_user_role_list',
            },
            {
              title: t('setting.add_role'),
              icon: RiUserAddLine,
              url: '/settings/roles/create',
              permission_key: 'add_edit_user_role',
              hidden: true,
            },
            {
              title: t('setting.store_working_hours'),
              url: '/settings/shop-working-hour',
              icon: RiTimeLine,
              permission_key: 'view_working_hours_list',
            },
            {
              title: t('setting.sms_zns_management'),
              url: '/settings/sms-email',
              icon: RiMailLine,
              permission_key: 'view_transaction_history',
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
              permission_key: 'pricing_policy',
            },
            {
              title: t('setting.payment_methods'),
              icon: RiBankCardLine,
              url: '/settings/payment-methods',
              permission_key: 'view_cash_fund_list',
            },
            {
              title: t('setting.tax_settings'),
              url: '/settings/tax',
              icon: RiPercentLine,
              permission_key: 'tax_setup',
            },
            {
              title: t('setting.order_status'),
              url: '/settings/order-status',
              icon: RiRouteLine,
              permission_key: 'order_status',
            },
            {
              title: t('setting.set_up_print_templates'),
              url: '/settings/print-template',
              icon: RiPrinterLine,
              permission_key: 'print_template_setup',
            },
            {
              title: t('setting.shipping_configuration'),
              url: '/settings/shipping',
              icon: RiTruckLine,
              permission_key: 'shipping_configuration',
            },
            {
              title: t('setting.electronic_scales'),
              icon: RiScales2Line,
              url: '/settings/electronic-scales',
              permission_key: 'electronic_scale',
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
              permission_key: 'basic_information',
            },
            {
              title: t('setting.add_webhook'),
              url: '/settings/webhooks/crete',
              permission_key: 'basic_information',
              hidden: true,
            },
            {
              title: t('setting.api_keys'),
              url: '/settings/api-keys',
              icon: RiLinksLine,
              permission_key: 'basic_information',
            },
            {
              title: t('setting.add_api_key'),
              url: '/settings/api-keys/create',
              permission_key: 'basic_information',
              hidden: true,
            },
          ],
        },
      ],
      hide_children: true,
      show_sub_sidebar: true,
    },
  ];



  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator orientation="horizontal" />
      <SidebarContent>
        <NavMain title={t('sidebar.main')} items={navMain} />
        <NavMain title={t('sidebar.other')} items={navOthers} />
      </SidebarContent>
      <Separator orientation="horizontal" />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
