
import * as React from "react"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

// SidebarTrigger component
export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-border/40 shadow-sm transition-all duration-200 hover:bg-primary/10", 
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {isCollapsed ? (
        <PanelRight className="h-4 w-4 text-primary" />
      ) : (
        <PanelLeftClose className="h-4 w-4 text-primary" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"
