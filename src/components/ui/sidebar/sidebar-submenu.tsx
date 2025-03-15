
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

// Submenu components 
export const SidebarMenuSub = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    data-sidebar="menu-sub"
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    icon?: React.ReactNode
  }
>(({ className, asChild = false, children, icon, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      type="button"
      data-sidebar="menu-sub-button"
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span className="truncate">{children}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 transition-transform data-[state=open]:rotate-90" />
    </Comp>
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export const SidebarMenuSubItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>(({ className, children, ...props }, ref) => (
  <a
    ref={ref}
    data-sidebar="menu-sub-item"
    className={cn(
      "flex w-full items-center gap-2 rounded-md p-2 text-left text-xs outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </a>
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"
