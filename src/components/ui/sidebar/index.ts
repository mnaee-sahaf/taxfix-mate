
// Re-export all sidebar components from this index file

// Main components from sidebar-components.tsx
export {
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from './sidebar-components';

// Group components from sidebar-group.tsx
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
} from './sidebar-group';

// Menu components from sidebar-menu.tsx
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
} from './sidebar-menu';

// Submenu components from sidebar-submenu.tsx
export {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './sidebar-submenu';

// Context provider
export {
  SidebarProvider,
  useSidebar,
} from './sidebar-context';
