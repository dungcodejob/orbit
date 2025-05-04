'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { RemixiconComponentType } from '@remixicon/react';
import { useTranslation } from 'react-i18next';

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon | RemixiconComponentType;
  isActive?: boolean;
  shortcut?: string;
  permission_key?: string;
  hide_children?: boolean;
  show_sub_sidebar?: boolean;
  hidden?: boolean;
  items?: NavItem[];
};

export function NavMain({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) {
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="h-9">
                  {item.icon && <item.icon className="!w-5 !h-5" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="space-y-1 py-1 mr-0">
                  {!item.hide_children &&
                    item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild className="h-9">
                          <a href={subItem.url}>
                            {subItem.icon && (
                              <subItem.icon className="!w-5 !h-5" />
                            )}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
