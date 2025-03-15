
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
                >
                  <Link to={item.href}>
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="text-sm">{item.name}</span>
                    {isActive(item.href) && (
                      <ChevronRight className="h-2.5 w-2.5 ml-auto" />
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
          >
            <Link to="/profile">
              <User className="h-3.5 w-3.5" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </>
  );
};

export default SidebarMenu;
