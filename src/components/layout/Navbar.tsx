
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'ur' : 'en');
  };
  
  const t = translations.navbar;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className={`font-bold text-xl ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              TaxFix
            </div>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/calculator" className={`hover:text-primary transition ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              {t.calculator}
            </Link>
            <Link to="/filing" className={`hover:text-primary transition ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              {t.taxFiling}
            </Link>
            
            {/* Language Switcher for Desktop */}
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              size="sm" 
              className={`border ${isScrolled ? 'border-input' : 'border-white/30 text-white'}`}
            >
              {currentLanguage === 'en' ? 'اردو' : 'English'}
            </Button>
            
            <Link to="/dashboard">
              <Button size="sm">{t.login}</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            {/* Language Switcher for Mobile */}
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              size="sm" 
              className={`border ${isScrolled ? 'border-input' : 'border-white/30 text-white'}`}
            >
              {currentLanguage === 'en' ? 'اردو' : 'English'}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMenu}
              className={isScrolled ? 'text-foreground' : 'text-white'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/calculator" 
                className="px-2 py-1 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.calculator}
              </Link>
              <Link 
                to="/filing" 
                className="px-2 py-1 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.taxFiling}
              </Link>
              <Link 
                to="/dashboard" 
                className="px-2 py-1 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.login}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
