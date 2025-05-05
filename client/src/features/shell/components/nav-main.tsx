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
import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


const findCurrentMenuItem = (
  menuItems: NavItem[],
  pathname: string,
): NavItem | null => {
  for (const item of menuItems) {
    if (item.items) {
      const found = findCurrentMenuItem(item.items, pathname);
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
  const { pathname } = useLocation();
  const activeItem = useMemo(() => {

    const current = findCurrentMenuItem(items, pathname);
    if (!current || current.items?.length) {
      return null;
    }

    return current;

  },[items,pathname])

  console.log('findCurrentMenuItem',findCurrentMenuItem(items, pathname));
  console.log('pathname',pathname);
  console.log('activeItem',activeItem)

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
                <SidebarMenuButton tooltip={item.title} isActive={activeItem?.url === item.url} className="h-9">
                
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
                        <SidebarMenuSubButton asChild className="h-9" isActive={activeItem?.url === subItem.url}>
                       
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
