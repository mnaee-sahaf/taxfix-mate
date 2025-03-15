
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  User, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tax Filing', href: '/filing', icon: FileText },
    { name: 'Tax Calculator', href: '/calculator', icon: Calculator },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 border-r shadow-sm">
      {/* Logo */}
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl">
            <span>Tax</span>
            <span className="text-primary">Fix</span>
          </div>
        </Link>
      </div>
      
      <Separator />
      
      {/* Navigation */}
      <div className="flex-1 py-4 px-2">
        <TooltipProvider delayDuration={100}>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {location.pathname === item.href && (
                      <ChevronRight className="h-4 w-4 ml-auto text-primary" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
      
      {/* User */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.email ? getInitials(user.email) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.email && user.email.split('@')[0]}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={signOut}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
