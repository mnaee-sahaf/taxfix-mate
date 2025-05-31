
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuIcon, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileMenu from '../auth/UserProfileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'File Tax', path: '/taxfilingtypes' },
    { name: 'Calculator', path: '/calculator' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleBookExpert = () => {
    navigate('/book-expert');
  };

  return (
    <header
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-lg sm:text-xl">
            <span>Tax</span>
            <span className="text-primary">Fix</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                isActive(link.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <UserProfileMenu />
          ) : (
            <>
              <Button 
                variant="secondary" 
                className="rounded-full text-sm flex items-center gap-2 bg-green-200 hover:bg-green-100 text-green-800" 
                onClick={handleBookExpert}
              >
                <User className="h-4 w-4" />
                Book An Expert
              </Button>
              <Button variant="outline" className="rounded-full text-sm" onClick={handleLogin}>
                Login
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel animate-fade-down">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-2.5 rounded-md text-sm font-medium',
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/taxfilingtypes')}>
                    File
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="secondary" className="w-full text-sm flex items-center gap-2" onClick={handleBookExpert}>
                      <User className="h-4 w-4" />
                      Book Expert
                    </Button>
                    <Button variant="outline" className="w-full text-sm" onClick={handleLogin}>
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
