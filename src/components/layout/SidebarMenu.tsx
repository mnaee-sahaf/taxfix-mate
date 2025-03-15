
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  User, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tax Filing', href: '/filing', icon: FileText },
    { name: 'Tax Calculator', href: '/calculator', icon: Calculator },
  ];

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <SidebarHeader className="px-2 py-2">
        <div className="font-bold text-xl">
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
                >
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </Menu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarFooter className="mt-auto">
        <Separator className="my-2" />
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild 
            isActive={isActive('/profile')} 
            tooltip="Profile"
          >
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span>{user?.email}</span>
              {isActive('/profile') && (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <div className="p-2">
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </SidebarFooter>
    </>
  );
};

export default SidebarMenu;
