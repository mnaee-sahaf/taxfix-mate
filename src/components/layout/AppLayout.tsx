
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block">
        <Sidebar />
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
