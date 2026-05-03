import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  alwaysScrolled?: boolean;
}

const Navigation = ({ alwaysScrolled = false }: NavigationProps) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(alwaysScrolled || !isHome);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (alwaysScrolled || !isHome) { setIsScrolled(true); return; }
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysScrolled, isHome]);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Industries', href: '#industries' },
    { label: 'Support', href: '#quality' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) { window.location.href = `/${href}`; return; }
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-navy/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-[6vw] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl lg:text-2xl font-bold text-white tracking-tight"
          >
            Lubcon<span className="text-gold"> Africa</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm text-white/80 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-sm text-white/80 hover:text-white transition-colors duration-300"
            >
              Blog
            </Link>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-2 rounded-full transition-all duration-300"
            >
              Request a quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-2xl font-display font-semibold text-white hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-display font-semibold text-white hover:text-gold transition-colors duration-300"
          >
            Blog
          </Link>
          <Button
            onClick={() => scrollToSection('#contact')}
            className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-3 rounded-full text-lg mt-4"
          >
            Request a quote
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
