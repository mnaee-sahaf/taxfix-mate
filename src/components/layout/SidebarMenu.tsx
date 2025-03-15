
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  User
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
      <SidebarHeader className="px-2 py-3">
        <div className="font-bold text-base flex items-center justify-center">
          <span className="text-gradient bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">TaxFix</span>
        </div>
      </SidebarHeader>
      
      <SidebarGroup>
        <SidebarGroupContent>
          <Menu className="px-2">
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(item.href)} 
                  tooltip={item.name}
                  className={cn(
                    "transition-all duration-200 mb-1",
                    isActive(item.href) && "bg-primary/10"
                  )}
                >
                  <Link to={item.href}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-200",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground"
                    )}>
                      {item.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </Menu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarFooter className="mt-auto mb-2">
        <Separator className="my-2 opacity-50" />
        <div className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={isActive('/profile')} 
              tooltip={user?.email || "Profile"}
              className={cn(
                "transition-all duration-200",
                isActive('/profile') && "bg-primary/10"
              )}
            >
              <Link to="/profile" className="flex items-center justify-center md:justify-start">
                <User className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isActive('/profile') ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-sm",
                  isActive('/profile') ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  Profile
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarFooter>
    </>
  );
};

export default SidebarMenu;
