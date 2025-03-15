
// Re-export all sidebar components from this index file

// Main components from sidebar-core.tsx
export {
  Sidebar,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
} from './sidebar-core';

// Trigger component
export { SidebarTrigger } from './sidebar-trigger';

// Rail component
export { SidebarRail } from './sidebar-rail';

// Section components from sidebar-sections.tsx
export {
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from './sidebar-sections';

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
