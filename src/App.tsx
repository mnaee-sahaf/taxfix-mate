
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Filing from '@/pages/Filing';
import Calculator from '@/pages/Calculator';
import Profile from '@/pages/Profile';
import BookExpert from '@/pages/BookExpert';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthCallback from '@/components/auth/AuthCallback';
import { Toaster } from '@/components/ui/toaster';
import TaxFilingTypePage from './pages/TaxFilingType';
import SimpleFiling from './pages/SimpleReturn';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/simple-return" element={<SimpleFiling />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/taxfilingtypes" element={<TaxFilingTypePage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/book-expert" element={<BookExpert />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/filing"
              element={
                <ProtectedRoute>
                  <Filing />
                </ProtectedRoute>
              }
            />
            <Route path="/calculator" element={<Calculator />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
