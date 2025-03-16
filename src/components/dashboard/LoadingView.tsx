import Footer from '@/components/layout/Footer';
import { Spinner } from '@/components/ui/spinner'

const LoadingView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-16 mt-16">
        <div className="flex items-center justify-center h-full">
          <Spinner />
          <h1 className="ml-4">Loading your tax dashboard...</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingView;
