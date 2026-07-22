'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Our Team', href: '#team' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    } else if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm h-16 md:h-20 py-0' : 'bg-transparent h-20 md:h-24'
        } flex items-center`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center w-full">
          <Link href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-2 z-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300 text-sage">
              <path d="M12 2L15.5 8.5L22 9.5L17.5 14L18.5 21L12 17.5L5.5 21L6.5 14L2 9.5L8.5 8.5L12 2Z" fill="currentColor" opacity="0.8"/>
              <path d="M12 22C12 22 2 16 2 10C2 7 4 5 7 5C9 5 11 7 12 9C13 7 15 5 17 5C20 5 22 7 22 10C22 16 12 22 12 22Z" fill="currentColor"/>
            </svg>
            <span className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 text-sage">
              Verdana
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="group relative font-body text-sm font-medium text-neutral-700 transition-colors hover:text-sage"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sage transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href="#booking"
              onClick={(e) => handleScrollTo(e, '#booking')}
              className="bg-terracotta hover:bg-terracotta-hover text-white px-7 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center no-underline cursor-pointer"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden z-50 text-sage p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-40 bg-cream-dark flex flex-col pt-24 px-6 pb-8 h-screen"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="font-display text-3xl sm:text-4xl text-sage hover:text-terracotta transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-auto"
            >
              <a
                href="#booking"
                onClick={(e) => handleScrollTo(e, '#booking')}
                className="block w-full text-center bg-terracotta text-white py-4 rounded-full font-body font-semibold text-lg hover:bg-terracotta-hover transition-all duration-300 no-underline cursor-pointer"
              >
                Book Appointment
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
