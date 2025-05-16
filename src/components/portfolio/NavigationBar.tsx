
"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '#practice', label: 'Practice' },
];

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0]?.href || '');

  const handleScroll = useCallback(() => {
    // For background change
    setIsScrolled(window.scrollY > 50);

    // For active link
    let currentActive = '';
    const scrollY = window.scrollY;
    // Offset should ideally be slightly more than navbar height (h-20 is 80px)
    const detectionOffset = window.innerHeight * 0.4; // Detect when section is about 40% from top of viewport

    for (let i = navLinks.length - 1; i >= 0; i--) {
      const link = navLinks[i];
      const section = document.getElementById(link.href.substring(1)); // Remove '#'
      if (section) {
        if (section.offsetTop <= scrollY + detectionOffset) {
          currentActive = link.href;
          break;
        }
      }
    }
    
    // Fallback for top of the page
    if (scrollY < 50 && navLinks.length > 0) {
        currentActive = navLinks[0].href;
    }

    // Fallback for bottom of the page - ensure the last section is active
    const atBottom = (window.innerHeight + Math.ceil(scrollY)) >= document.body.scrollHeight - 2; // -2 for rounding
    if (atBottom && navLinks.length > 0) {
        currentActive = navLinks[navLinks.length -1].href;
    }

    setActiveSection(currentActive || (navLinks[0]?.href || ''));
  }, []); // navLinks is stable

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenuAndScroll = (href: string) => {
    setIsOpen(false);
    // Smooth scroll for Next.js Link component is handled by CSS scroll-behavior: smooth
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isOpen ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="#home" className="flex items-center space-x-2 text-2xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => closeMenuAndScroll('#home')}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50">
              <Image
                src="https://res.cloudinary.com/dewkk3cbk/image/upload/v1747423743/WhatsApp_Image_2025-05-15_at_21.05.35_cebad3d7_xgsdiz.jpg"
                alt="Ritik Thakur Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                data-ai-hint="logo person"
              />
            </div>
            <span>Ritik Thakur</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-foreground hover:text-primary transition-colors font-medium",
                  activeSection === link.href && "text-primary font-semibold"
                )}
                onClick={() => closeMenuAndScroll(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg absolute top-20 left-0 right-0 pb-4 shadow-xl">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-foreground hover:text-primary transition-colors text-lg",
                  activeSection === link.href && "text-primary font-semibold"
                )}
                onClick={() => closeMenuAndScroll(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationBar;
