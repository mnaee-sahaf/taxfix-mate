
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  User, 
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu as Menu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';

const SidebarMenu = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tax Filing', href: '/filing', icon: FileText },
    { name: 'Tax Calculator', href: '/calculator', icon: Calculator },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <SidebarHeader className="px-1.5 py-1.5">
        <div className="font-bold text-base">
          <span>Tax</span>
          <span className="text-primary">Fix</span>
        </div>
      </SidebarHeader>
      
      <SidebarGroup>
        <SidebarGroupContent>
          <Menu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(item.href)} 
                  tooltip={item.name}
                  className={cn(
                    "transition-all duration-200",
                    isActive(item.href) && "bg-primary/10 dark:bg-primary/20"
                  )}
                >
                  <Link to={item.href}>
                    <item.icon className={cn(
                      "h-3.5 w-3.5 transition-all duration-200",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isActive(item.href) && "text-primary font-medium"
                    )}>
                      {item.name}
                    </span>
                    {isActive(item.href) && (
                      <ChevronRight className="h-2.5 w-2.5 ml-auto text-primary" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </Menu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarFooter className="mt-auto">
        <Separator className="my-1.5" />
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild 
            isActive={isActive('/profile')} 
            tooltip={user?.email || "Profile"}
            className={cn(
              "transition-all duration-200",
              isActive('/profile') && "bg-primary/10 dark:bg-primary/20"
            )}
          >
            <Link to="/profile">
              <User className={cn(
                "h-3.5 w-3.5 transition-all duration-200",
                isActive('/profile') ? "text-primary" : "text-muted-foreground"
              )} />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </>
  );
};

export default SidebarMenu;
