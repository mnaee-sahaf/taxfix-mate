
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LoadingView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 mt-16">
        <div className="flex items-center justify-center h-full">
          <p>Loading your tax dashboard...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingView;
