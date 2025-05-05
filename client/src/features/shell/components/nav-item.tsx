

"use client"
import { LucideIcon } from "lucide-react"


import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { NavItem } from "./nav-main"
import { cn } from "@/utils/cn"
import { Link } from "@tanstack/react-router"

type NavProps = {
    isCollapsed: boolean;
    items: NavItem[];
}

export function Nav({ items, isCollapsed }: NavProps) {
    const isActive = false;
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {items.map((item, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/"
                                    className={cn(
                                        buttonVariants({ variant: 'outline', size: "icon" }),
                                        "h-9 w-9",
                                        isActive &&
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    {item.icon && <item.icon className="!w-5 !h-5" />}
                                    <span className="sr-only">{item.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {item.title}

                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            to="/"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: "sm" }),
                                isActive &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start"
                            )}
                        >
                            {item.icon && <item.icon className="!w-5 !h-5" />}
                            {item.title}

                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}