
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Footer from './Footer';
import Navbar from './Navbar';
import AuthenticatedNavbar from './AuthenticatedNavbar';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Redirect authenticated users away from the homepage
  if (isAuthenticated && isHomePage) {
    return <Navigate to="/dashboard" replace />;
  }

  // For non-authenticated users, show the regular layout with Navbar
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

  // For authenticated users, show AuthenticatedNavbar
  return (
    <div className="flex flex-col min-h-screen">
      <AuthenticatedNavbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
