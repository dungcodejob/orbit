'use client';


import { useLocation, useNavigate } from '@tanstack/react-router';
import { type FC } from 'react';



const SubSidebarMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

//   return     (<Sidebar collapsible="icon">
//   <SidebarHeader>
    
//   </SidebarHeader>
//   <Separator orientation="horizontal" />
//   <SidebarContent>
    
//   </SidebarContent>
//   <Separator orientation="horizontal" />
//   <SidebarFooter>
   
//   </SidebarFooter>
//   <SidebarRail />
// </Sidebar>)

  return (
    <>
      <div className="hidden w-[16rem] shrink-0 flex-col border-r border-stroke-soft-200 lg:flex max-h-screen overflow-hidden">
        <div className="px-2 flex-none h-16 flex items-center">
          <div className="text-label-lg text-text-strong-950"></div>
        </div>

        {/* <Divider.Root className="px-2" />

        <TabMenuVertical.Root
          defaultValue={pathname}
          className="flex w-full flex-col lg:flex-row flex-auto overflow-y-auto px-2 py-3"
        >
          <TabMenuVertical.List className="h-max">
            {items.map(({ uuid, label, children }, i, arr) => (
              <React.Fragment key={uuid}>
                <div className="flex flex-col gap-2">
                  <Divider.Root variant="text">{label}</Divider.Root>
                  {children?.map(
                    ({ uuid, label, icon: Icon, link, hidden }) => {
                      if (hidden) {
                        return null;
                      }
                      return (
                        <TabMenuVertical.Trigger
                          key={uuid}
                          asChild
                          value={link as string}
                        >
                          <Link to={link}>
                            {Icon && <TabMenuVertical.Icon as={Icon} />}
                            {label}
                            <TabMenuVertical.ArrowIcon as={RiArrowRightSLine} />
                          </Link>
                        </TabMenuVertical.Trigger>
                      );
                    },
                  )}
                </div>
                {i < arr.length - 1 && <Divider.Root variant="line-spacing" />}
              </React.Fragment>
            ))}
          </TabMenuVertical.List>
        </TabMenuVertical.Root> */}
      </div>
      {/* <div className="p-4 pb-0 lg:hidden">
        <Select.Root
          defaultValue={pathname}
          onValueChange={(href) => navigate({ to: href })}
        >
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {items.map(({ uuid, label, icon: Icon, link }) => (
              <Select.Group key={uuid}>
                <Select.GroupLabel className="mb-1 mt-2 px-2 py-1 text-subheading-xs text-text-soft-400">
                  {label}
                </Select.GroupLabel>
                <Select.Item key={uuid} value={link as string}>
                  <Select.ItemIcon as={Icon} />
                  {label}
                </Select.Item>
              </Select.Group>
            ))}
          </Select.Content>
        </Select.Root>
      </div> */}
    </>
  );
};

export default SubSidebarMenu;
