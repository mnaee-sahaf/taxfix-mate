
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileMenu from '@/components/auth/UserProfileMenu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container max-w-screen-xl flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">
          TaxFix
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/calculator" className="text-foreground/80 hover:text-foreground transition-colors">
                Calculator
              </Link>
              <Link to="/auth" className="text-foreground/80 hover:text-foreground transition-colors">
                Login
              </Link>
              <Button asChild variant="default" className="rounded-full button-shine">
                <Link to="/auth">
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <UserProfileMenu />
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-3/4 md:w-1/2 bg-background border-l">
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through the application.
              </SheetDescription>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
