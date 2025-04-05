import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="font-bold text-2xl">Arthur Iverson</a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="hover:text-[var(--primary)] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[var(--primary)] transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-[var(--primary)] transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-[var(--primary)] transition-colors">FAQ</a>
          <a href="#order-form" className="btn-primary">Get Started</a>
        </div>
        
        <button 
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-2 px-4 hover:bg-[var(--bg-light)] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="py-2 px-4 hover:bg-[var(--bg-light)] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="py-2 px-4 hover:bg-[var(--bg-light)] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              className="py-2 px-4 hover:bg-[var(--bg-light)] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#order-form" 
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}