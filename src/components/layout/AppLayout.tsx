
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarTrigger,
  SidebarRail
} from '@/components/ui/sidebar';
import Footer from './Footer';
import Navbar from './Navbar';
import SidebarMenu from './SidebarMenu';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCalculatorPage = location.pathname === '/calculator';

  // Redirect authenticated users away from the homepage
  if (isAuthenticated && isHomePage) {
    return <Navigate to="/dashboard" replace />;
  }

  // For non-authenticated users, show the regular layout
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // For calculator page (logged in), show only sidebar without navbar/footer
  if (isAuthenticated && isCalculatorPage) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar variant="inset" collapsible="icon">
            <SidebarContent>
              <SidebarMenu />
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <SidebarTrigger className="m-1.5 absolute z-10" />
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 pt-8">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // For all other authenticated pages
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarMenu />
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <SidebarTrigger className="m-1.5 absolute z-10" />
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 pt-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
