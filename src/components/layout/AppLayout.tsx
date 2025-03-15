
import React from 'react';
import { Outlet } from 'react-router-dom';
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
          <SidebarTrigger className="m-2 absolute z-10" />
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 pt-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
