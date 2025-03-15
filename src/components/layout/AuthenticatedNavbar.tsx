
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserProfileMenu from '../auth/UserProfileMenu';
import { LayoutDashboard, FileText, Calculator } from 'lucide-react';

const AuthenticatedNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tax Filing', href: '/filing', icon: FileText },
    { name: 'Tax Calculator', href: '/calculator', icon: Calculator },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm py-3 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="font-bold text-xl">
            <span>Tax</span>
            <span className="text-primary">Fix</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2',
                isActive(item.href)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedNavbar;
